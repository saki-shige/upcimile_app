require 'rails_helper'

RSpec.describe "Companies", :type => :request do
  let!(:company){ create(:company, name: 'company') }
  let!(:companies){ create_list(:company, 4) }

  describe 'GET /api/v1/companies/' do
    before do
      get '/api/v1/companies'
    end

    it 'レスポンスが帰ってくる'do
      expect(response.status).to eq(200)
    end

    it '全ての企業を取得する' do
      json = JSON.parse(response.body)
      expect(json.length).to eq(1+companies.length)
    end
  end

  describe 'GET /api/v1/pcompanies/:id' do
    let!(:related_products){ create_list(:product, 4, company: company) }
    let!(:other_products){ create_list(:product, 5, name: 'other_product') }

    before do
      get "/api/v1/companies/#{company.id}"
      @json = JSON.parse(response.body)
    end

    it 'レスポンスが返ってくる' do
      expect(response.status).to eq(200)
    end

    it '企業情報を取得する' do
      expect(@json['name']).to eq(company.name)
      expect(@json['introduction']).to eq(company.introduction)
    end

    it '提供している商品を取得する' do
      expect(@json['products'].length).to eq(related_products.length)
      expect(@json['products'][0]['name']).to eq(related_products[0].name)
    end
  end

  describe 'POST /api/v1/auth' do
    it '新しい企業を作成する' do
      valid_params = { name: 'name', email: 'test@email.com', password: 'password', password_confirmation:'password' }
      expect { post '/api/v1/auth', params: { registration: valid_params }}.to change(Company, :count).by(+1)
      expect(response.status).to eq(200)
    end
  end

  describe 'POST /api/v1/auth/sign_in' do
    it 'ログインする' do
      valid_params = { email: company.email, password: company.password }
      post '/api/v1/auth/sign_in', params: { session: valid_params }
      expect(response.status).to eq(200)
    end
  end

  describe 'PUT /api/v1/companies/:id' do
    it '企業情報の編集を行う' do
      put "/api/v1/companies/#{company.id}", params: { company: {name: 'new-name'} }
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json['company']['name']).to eq('new-name')
   end
  end
end