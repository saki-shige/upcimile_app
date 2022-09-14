require 'rails_helper'

RSpec.describe 'Companies', type: :request do
  let!(:company) { create(:company, name: 'company') }
  let!(:companies) { create_list(:company, 4) }

  describe 'GET /api/v1/companies/' do
    before do
      get '/api/v1/companies'
    end

    it 'レスポンスが帰ってくる' do
      expect(response.status).to eq(200)
    end

    it '全ての企業を取得する' do
      json = JSON.parse(response.body)
      expect(json.length).to eq(1 + companies.length)
    end
  end

  describe 'GET /api/v1/pcompanies/:id' do
    let!(:related_available_products) { create_list(:product, 4, company:) }
    let!(:related_not_available_products) { create_list(:product, 3, company:, available_from: Date.tomorrow) }
    let!(:other_products) { create_list(:product, 5, name: 'other_product') }

    context 'マイページからアクセスした場合' do
      let(:token) { sign_in company }

      before do
        get "/api/v1/companies/#{company.id}?mypage=true", headers: token
      end

      it '企業情報と掲載期間を含むすべての関連商品を取得する' do
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json['name']).to eq(company.name)
        expect(json['introduction']).to eq(company.introduction)
        expect(json['products'].length).to eq(related_available_products.length + related_not_available_products.length)
        expect(json['products'][0]['name']).to eq(related_available_products[0].name)
      end
    end

    context 'マイページ以外からアクセスした場合' do
      before do
        get "/api/v1/companies/#{company.id}"
      end

      it '企業情報と掲載期間内の関連商品のみを取得する' do
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json['name']).to eq(company.name)
        expect(json['introduction']).to eq(company.introduction)
        expect(json['products'].length).to eq(related_available_products.length)
        expect(json['products'][0]['name']).to eq(related_available_products[0].name)
      end
    end
  end

  describe 'POST /api/v1/auth' do
    it '新しい企業を作成する' do
      valid_params = { name: 'name', email: 'test@email.com', password: 'password', password_confirmation: 'password' }
      expect { post '/api/v1/auth', params: { registration: valid_params } }.to change(Company, :count).by(+1)
      expect(response.status).to eq(200)
    end
  end

  describe 'POST /api/v1/auth/sign_in' do
    context '正しいパスワードを入力した時' do
      it 'ログインすることができる' do
        valid_params = { email: company.email, password: company.password }
        post '/api/v1/auth/sign_in', params: { session: valid_params }
        expect(response.status).to eq(200)
      end
    end
    context '誤ったパスワードを入力した時' do
      it 'ログインすることができない' do
        valid_params = { email: company.email, password: 'wrong password' }
        post '/api/v1/auth/sign_in', params: { session: valid_params }
        expect(response.status).to eq(401)
      end
    end
  end

  describe 'PUT /api/v1/companies/:id' do
    context 'サインインしている時' do
      let(:token) { sign_in company }

      it '企業情報の更新を行うことができる' do
        put "/api/v1/companies/#{company.id}", params: { company: { name: 'new-name' } }, headers: token
        json = JSON.parse(response.body)
        expect(response.status).to eq(200)
        expect(json['company']['name']).to eq('new-name')
      end
    end

    context 'サインインしていない時' do
      it '企業情報の更新に失敗する' do
        put "/api/v1/companies/#{company.id}", params: { company: { name: 'new-name' } }
        expect(response.status).to eq(401)
      end
    end
  end
end
