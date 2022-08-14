require 'rails_helper'

RSpec.describe "Companies", :type => :request do
  let(:creator){ create(:creator) }

  describe 'GET /api/v1/creators/:id' do
    before do
      youtube_client_mock = instance_double('Youtube client')
      allow(Creator).to receive(:find).and_return(youtube_client_mock)
      allow(youtube_client_mock).to receive(:find_channel_info).and_return(creator_info)
      allow(youtube_client_mock).to receive(:find_channel_video_info).and_return(creator_videos)
    end

    context 'モデルからデータが取得できた時' do
      let(:creator_info){ {channel_title: 'test_channel_title'} }
      let(:creator_videos){ [{video_title: 'test_channel_title'}] }

      it 'creator_info、creator_videosを返す' do
        get "/api/v1/creators/#{creator.id}"
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json['creator_info']['channel_title']).to eq(creator_info[:channel_title])
        expect(json['creator_videos'][0]['video_title']).to eq(creator_videos[0][:video_title])
      end
    end

    context 'モデルからデータが取得できなかった時' do
      let(:creator_info){ nil }
      let(:creator_videos){ nil }

      it 'status404を返す'do
        get "/api/v1/creators/#{creator.id}"
        expect(response.status).to eq(404)
      end
    end
  end

  describe 'GET /api/v1/creators/' do
    before do
      allow(Creator).to receive(:list_up_all_channel_info).and_return(creators_info)
    end
    context 'モデルからデータが取得できた時' do
      let(:creators_info){ [{channel_title: 'test_channel_title'}] }

      it 'creators_infoを返す' do
        get "/api/v1/creators"
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json[0]['channel_title']).to eq(creators_info[0][:channel_title])
      end
    end

    context 'モデルからデータが取得できなかった時' do
      let(:creators_info){ [{channel_title: 'test_channel_title'}] }

      it 'status404を返す'do
        get "/api/v1/creators/#{creator.id}"
        expect(response.status).to eq(404)
      end
    end
  end
end
