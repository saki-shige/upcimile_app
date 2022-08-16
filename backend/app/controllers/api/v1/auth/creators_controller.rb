require_dependency 'api/v1/application_controller'
module Api
  module V1
    module Auth
      class CreatorsController < ApplicationController
        require 'google/apis/youtube_v3'

        def create
          FirebaseIdToken::Certificates.request
          raise ArgumentError, 'BadRequest Parameter' if payload.blank?
          creator = Creator.find_or_initialize_by(uid: payload['sub'])
          creator.name = payload['name']
          creator.email = payload['email']
          my_channel_info = creator.find_my_channel_info(params[:access_token])
          creator.channel_id = my_channel_info.items[0].id
          if creator.new_record?
            message = 'ユーザー登録を完了しました'
          else
            message = 'ログインしました'
          end
          if creator.save
            render json: { data: creator, message: message }
          else
            render json: creator.errors
          end
        end

        private

        def token
          creator_params[:id_token] || token_from_request_headers
          # params[:id_token] || token_from_request_headers
        end

        def payload
          @payload ||= FirebaseIdToken::Signature.verify token
        end

        def creator_params
          params.require(:creator).permit(:channel_id).merge(id_token: params.require(:id_token))
        end
      end
    end
  end
end
