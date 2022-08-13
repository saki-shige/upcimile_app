class Api::V1::CreatorsController < ApplicationController
  require 'google/apis/youtube_v3'

  def index
    creators = Creator.all
    creators_info = []
    creators.each do |creator|
      creators_info.push(creator.find_channel_info)
    end
    render json: creators_info
  end

  def show
    creator = Creator.find(params[:id])
    creator_info = creator.find_channel_info
    creator_videos = creator.find_channel_video_info
    render json: {creator_info:creator_info, videos: creator_videos}
  end

  private

  def creator_params
    params.require(:creator).permit(:channel_id)
  end
end
