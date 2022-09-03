require 'rails_helper'

RSpec.describe 'Creators', type: :request do
  describe 'GET /api/v1/creators/:id' do
    let(:creator) { create(:creator) }
    before do
      creator_mock = instance_double(Creator)
      allow(Creator).to receive(:find).and_return(creator_mock)
      allow(creator_mock).to receive(:channel_info).and_return(creator_info)
      allow(creator_mock).to receive(:channel_videos).and_return(creator_videos)
    end

    context 'モデルからデータが取得できた時' do
      let(:creator_info) { { channel_title: 'test_channel_title' } }
      let(:creator_videos) { [{ video_title: 'test_channel_title' }] }

      it 'creator_info、creator_videosを返す' do
        get "/api/v1/creators/#{creator.id}"
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json['creator_info']['channel_title']).to eq(creator_info[:channel_title])
        expect(json['creator_videos'][0]['video_title']).to eq(creator_videos[0][:video_title])
      end
    end

    context 'モデルからデータが取得できなかった時' do
      let(:creator_info) { nil }
      let(:creator_videos) { nil }

      it 'status404を返す' do
        get "/api/v1/creators/#{creator.id}"
        expect(response.status).to eq(404)
      end
    end
  end

  describe 'GET /api/v1/creators/' do
    let!(:creators) { create_list(:creator, 4) }

    it 'すべてのcreatorを返す' do
      get '/api/v1/creators'
      expect(response.status).to eq(200)
      json = JSON.parse(response.body)
      expect(json.length).to eq(creators.length)
    end
  end
end
