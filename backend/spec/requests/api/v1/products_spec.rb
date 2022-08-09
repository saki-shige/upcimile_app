require 'rails_helper'

RSpec.describe "Products", :type => :request do
  let(:company){ create(:company, name: 'company') }
  let(:category){ create(:category)}
  let!(:product){ create(:product, company: company, category: category) }
  let!(:related_products){ create_list(:product, 4, name: 'related_product', category: category) }
  let!(:other_products){ create_list(:product, 5, name: 'other_product') }

  describe 'GET /api/v1/products/' do
    before do
      get '/api/v1/products'
    end

    it 'レスポンスが帰ってくる'do
      expect(response.status).to eq(200)
    end

    it '全ての商品を取得する' do
      json = JSON.parse(response.body)
      # product(1つ)＋related_product(４つ)+other_product(5つ）=10
      expect(json['data'].length).to eq(10)
    end
  end

  describe 'GET /api/v1/products/:id' do
    before do
      get "/api/v1/products/#{product.id}"
      @json = JSON.parse(response.body)
    end

    it 'レスポンスが返ってくる' do
      expect(response.status).to eq(200)
    end

    it '特定の商品情報を取得する' do
      expect(@json['product']['name']).to eq(product.name)
      expect(@json['product']['introduction']).to eq(product.introduction)
    end

    it '同じカテゴリーに属する商品を取得する' do
      expect(@json['related_products'].length).to eq(4)
      expect(@json['related_products'][0]['name']).to eq(related_products[0].name)
    end

    it '提供企業の情報を取得する' do
      expect(@json['company']['name']).to eq(company.name)
    end
  end

  describe 'POST /api/v1/products' do
    it '新しいproductを作成する' do
      valid_params = { name: 'name', introduction: 'introduction', available_from: '2020-1-1', company_id:company.id, category_id: category.id }
      expect { post '/api/v1/products', params: { product: valid_params } }.to change(Product, :count).by(+1)
      expect(response.status).to eq(200)
    end
  end

  describe 'PUT /api/v1/products/:id' do
    it 'productの編集を行う' do
      put "/api/v1/products/#{product.id}", params: { product: {name: 'new-name'} }
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json['data']['name']).to eq('new-name')
   end
  end

  describe 'DELETE /api/v1/products' do
    it 'productを削除する' do
      expect { delete "/api/v1/products/#{product.id}" }.to change(Product, :count).by(-1)
      expect(response.status).to eq(200)
    end
  end
end
