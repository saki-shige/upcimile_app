class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Firebase::Auth::Authenticable
  skip_before_action :verify_authenticity_token

  def authenticate_company
    return if api_v1_company_signed_in?

    render json: { message: 'ログインしてください' }, status: 401
  end

  def api_v1_creator_signed_in?
    FirebaseIdToken::Certificates.request
    !payload.blank?
  end

  def current_api_v1_creator
    FirebaseIdToken::Certificates.request
    if payload.blank?
      render json: { message: 'idTokenが誤っています' }, status: 400
    else
      Creator.find_by(uid: payload['sub'])
    end
  end

  def authenticate_creator
    return if api_v1_creator_signed_in?

    render json: { message: 'ログインしてください' }, status: 401
  end

  def payload
    @payload ||= FirebaseIdToken::Signature.verify token
  end

  def token
    params[:id_token] || token_from_request_headers
  end
end
