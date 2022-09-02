class Api::V1::Auth::CreatorsController < ApplicationController
  require 'google/apis/youtube_v3'

  def create
    FirebaseIdToken::Certificates.request
    raise ArgumentError, 'BadRequest Parameter' if payload.blank?

    creator = Creator.find_or_initialize_by(uid: payload['sub'])
    creator.email = payload['email']
    creator = creator.my_channel_info(params[:access_token])
    if creator.save
      render json: { creator_info: creator, message: }
    else
      render json: creator.errors
    end
  end
end
