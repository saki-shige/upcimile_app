require 'rails_helper'

RSpec.describe 'Api::V1::Offers', type: :request do
  describe 'GET api/v1/offers' do
    context 'クエリパラメーターがpart=companyの場合' do
      let(:company) { create(:company) }
      let(:product) { create(:product, company:) }
      let(:product_not_related) { create(:product) }
      let!(:offers) { create_list(:offer, 3, product:) }
      let!(:offers_not_related) { create_list(:offer, 2) }
      let(:token) { sign_in company }

      it 'companyに関連するすべてのoffer,offerに関連するproductを返す' do
        get '/api/v1/offers?part=company', headers: token
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json.length).to eq(offers.length)
        expect(json[0]['product']['id']).to eq(product.id)
      end
    end

    context 'クエリパラメーターがpart=creatorの場合' do
      let(:creator) { create(:creator) }
      let!(:offers) { create_list(:offer, 3, creator:) }
      let!(:offers_not_related) { create_list(:offer, 2) }
      let(:headers) { { 'Content-Type': 'application/json', Authorization: 'Bearer token' } }
      before do
        stub_current_api_v1_creator(creator)
      end

      it 'ccreatorに関連するすべてのoffer,offerに関連するproductを返す' do
        get '/api/v1/offers?part=creator', headers: headers
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json.length).to eq(offers.length)
        expect(json[0]['product']['id']).to eq(offers[0].product.id)
      end
    end

    context 'クエリパラメーターが入力されなかった場合' do
      let(:creator) { create(:creator) }

      it 'status:400を返す' do
        get '/api/v1/offers', headers: headers
        expect(response.status).to eq(400)
      end
    end

    context 'ログインをしていない場合' do
      it 'status:401を返す' do
        get '/api/v1/offers?part=company'
        expect(response.status).to eq(401)
      end
    end
  end

  describe 'post /api/v1/offers' do
    let!(:product) { create(:product) }
    let!(:creator) { create(:creator) }
    before do
      stub_authenticate_creator
      stub_current_api_v1_creator(creator)
    end

    it 'offerが作成される' do
      valid_params = { product_id: product.id, creator_id: creator.id }
      expect { post '/api/v1/offers', params: { offer: valid_params } }.to change(Offer, :count).by(+1)
      expect(response.status).to eq(201)
    end
  end

  describe 'put /api/v1/offers' do
    let(:offer) { create(:offer) }

    context 'type=acceptの場合' do
      let(:token) { sign_in offer.product.company }

      it 'offerを承認する' do
        put "/api/v1/offers/#{offer.id}?type=accept", headers: token
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json['is_accepted']).to eq(true)
      end
    end

    context 'type=declineの場合' do
      let(:token) { sign_in offer.product.company }

      it 'offerを否認する' do
        put "/api/v1/offers/#{offer.id}?type=decline", headers: token
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json['is_accepted']).to eq(false)
      end
    end

    context 'typeクエリが正しくない場合' do
      let(:token) { sign_in offer.product.company }

      it 'status:400を返す' do
        put "/api/v1/offers/#{offer.id}?type=wrongtype", headers: token
        expect(response.status).to eq(400)
      end
    end

    context '提供者ではないcompanyがログインしている場合' do
      let(:other_company) { create(:company) }
      let(:token) { sign_in other_company }

      it 'offerの承認、否認はできない' do
        put "/api/v1/offers/#{offer.id}?type=accept", headers: token
        expect(response.status).to eq(401)
      end
    end
  end
end
