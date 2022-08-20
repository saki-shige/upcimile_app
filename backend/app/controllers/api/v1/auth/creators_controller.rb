class Api::V1::Auth::CreatorsController < ApplicationController
  require 'google/apis/youtube_v3'

  def create
    FirebaseIdToken::Certificates.request
    raise ArgumentError, 'BadRequest Parameter' if payload.blank?

    creator = Creator.find_or_initialize_by(uid: payload['sub'])
    creator.email = payload['email']
    my_channel_info = creator.find_my_channel_info(params[:access_token])
    raise ArgumentError, 'No Youtube Account' unless my_channel_info.items

    creator.channel_id = my_channel_info.items[0].id
    creator.name = my_channel_info.items[0].snippet.title
    creator.introduction = my_channel_info.items[0].snippet.description
    creator.image = my_channel_info.items[0].snippet.thumbnails.high.url
    message = if creator.new_record?
                'ユーザー登録を完了しました'
              else
                'ログインしました'
              end
    if creator.save
      render json: { creator_info: creator, message: }
    else
      render json: creator.errors
    end
  end
end
