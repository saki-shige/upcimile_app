require 'rails_helper'

RSpec.describe 'Products', type: :request do
  let(:company) { create(:company, name: 'company') }
  let(:category) { create(:category) }
  let!(:product) { create(:product, company:, category:) }
  let!(:related_products) { create_list(:product, 4, name: 'related_product', category:) }
  let!(:other_products) { create_list(:product, 5, name: 'other_product') }

  describe 'GET /api/v1/products/' do
    context 'limit,categoryが指定されていない時' do
      before do
        get '/api/v1/products'
      end

      it '全ての商品を取得する' do
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        # product(1つ)＋related_product+other_product
        expect(json.length).to eq(1 + related_products.length + other_products.length)
      end
    end

    context 'limitが指定されている場合' do
      let(:limit) { 2 }
      before do
        get "/api/v1/products?limit=#{limit}"
      end

      it '指定された数の商品を取得する' do
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        # product(1つ)＋related_product+other_product
        expect(json.length).to eq(limit)
      end
    end

    context 'categoryが指定されている場合' do
      before do
        get "/api/v1/products?category=#{category.id}"
      end

      it '指定されたカテゴリーの商品を取得する' do
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json.length).to eq(1 + related_products.length)
      end
    end
  end

  describe 'GET /api/v1/products/:id' do
    before do
      get "/api/v1/products/#{product.id}"
    end

    it 'レスポンスが返ってくる' do
      expect(response.status).to eq(200)
    end

    it '特定の商品情報を取得する' do
      json = JSON.parse(response.body)
      expect(json['product']['name']).to eq(product.name)
      expect(json['product']['introduction']).to eq(product.introduction)
      expect(json['related_products'].length).to eq(related_products.length)
      expect(json['related_products'][0]['id']).to eq(related_products[related_products.length - 1].id)
      expect(json['company']['name']).to eq(company.name)
    end
  end

  describe 'POST /api/v1/products' do
    let(:valid_params) do
      { name: 'name', introduction: 'introduction', available_from: Date.today, company_id: company.id,
        category_id: category.id }
    end

    context 'companyがログインしている場合' do
      let(:token) { sign_in company }

      it '新しいproductを作成する' do
        expect do
          post '/api/v1/products', params: { product: valid_params }, headers: token
        end.to change(Product, :count).by(+1)
        expect(response.status).to eq(200)
      end
    end

    context 'companyがログインしていない場合' do
      it '新しいproductを作成することはできない' do
        expect { post '/api/v1/products', params: { product: valid_params } }.not_to change(Product, :count)
        expect(response.status).to eq(401)
      end
    end
  end

  describe 'PUT /api/v1/products/:id' do
    context 'companyがログインしている場合' do
      let(:token) { sign_in company }

      it 'productの編集を行うことができる' do
        put "/api/v1/products/#{product.id}", params: { product: { name: 'new-name' } }, headers: token
        json = JSON.parse(response.body)
        expect(response.status).to eq(200)
        expect(json['data']['name']).to eq('new-name')
      end
    end

    context 'companyがログインしている場合' do
      it 'productの編集を行うことができない' do
        put "/api/v1/products/#{product.id}", params: { product: { name: 'new-name' } }
        expect(response.status).to eq(401)
      end
    end
  end

  describe 'DELETE /api/v1/products' do
    context 'companyがログインしている場合' do
      let(:token) { sign_in company }

      it 'productを削除する' do
        expect { delete "/api/v1/products/#{product.id}", headers: token }.to change(Product, :count).by(-1)
        expect(response.status).to eq(200)
      end
    end

    context 'companyがログインしていない場合' do
      it 'productを削除することができない' do
        expect { delete "/api/v1/products/#{product.id}" }.not_to change(Product, :count)
        expect(response.status).to eq(401)
      end
    end
  end
end
