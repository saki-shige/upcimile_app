class Api::V1::CreatorsController < ApplicationController
  require 'google/apis/youtube_v3'

  def index
    creators_info = Creator.list_up_all_channel_info
    if creators_info
      render status: 200, json: creators_info
    else
      render status: 404, json: {message: "表示できるクリエイターが見つかりませんでした"}
    end
  end

  def show
    creator = Creator.find(params[:id])
    creator_info = creator.find_channel_info
    creator_videos = creator.find_channel_video_info
    if creator_info && creator_videos
      render status: 200, json: {creator_info: creator_info, creator_videos: creator_videos}
    else
      render status: 404, json: {messsage: '表示できるクリエイターは見つかりませんでした。'}
    end
  end

  private

  def creator_params
    params.require(:creator).permit(:channel_id)
  end
end
