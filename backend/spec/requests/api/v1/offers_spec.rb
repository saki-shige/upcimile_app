require 'rails_helper'

RSpec.describe 'Api::V1::Offers', type: :request do
  describe 'GET api/v1/offers' do
    context 'クエリパラメーターがcompany_idの場合' do
      let(:company) { create(:company) }
      let(:product) { create(:product, company:) }
      let(:product_not_related) { create(:product) }
      let!(:offers) { create_list(:offer, 3, product:) }
      let!(:offers_not_related) { create_list(:offer, 2) }

      it 'companyに関連するすべてのoffer,offerに関連するproductを返す' do
        get "/api/v1/offers?company_id=#{company.id}"
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json.length).to eq(offers.length)
        expect(json[0]['product']['id']).to eq(product.id)
      end
    end

    context 'クエリパラメーターがcreator_idの場合' do
      let(:creator) { create(:creator) }
      let!(:offers) { create_list(:offer, 3, creator:) }
      let!(:offers_not_related) { create_list(:offer, 2) }

      it 'ccreatorに関連するすべてのoffer,offerに関連するproductを返す' do
        get "/api/v1/offers?creator_id=#{creator.id}"
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json.length).to eq(offers.length)
        expect(json[0]['product']['id']).to eq(offers[0].product.id)
      end
    end

    context 'クエリパラメーターが入力されなかった場合' do
      it 'status:400を返す' do
        get '/api/v1/offers'
        expect(response.status).to eq(400)
      end
    end
  end

  describe 'post /api/v1/offers' do
    let!(:product) { create(:product) }
    let!(:creator) { create(:creator) }

    it 'offerが作成される' do
      valid_params = { product_id: product.id, creator_id: creator.id }
      expect { post '/api/v1/offers', params: { offer: valid_params } }.to change(Offer, :count).by(+1)
      expect(response.status).to eq(201)
    end
  end

  describe 'put /api/v1/offers' do
    let(:offer) { create(:offer) }
    it 'offerを承認する' do
      put "/api/v1/offers/#{offer.id}"
      expect(response.status).to eq(200)
      json = JSON.parse(response.body)
      expect(json['is_accepted']).to eq(true)
    end
  end
end
