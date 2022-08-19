module CreatorAuthentication
  extend ActiveSupport::Concern
  include Firebase::Auth::Authenticable

  def api_v1_creator_signed_in?
    FirebaseIdToken::Certificates.request
    payload.blank? ? false : true
  end

  def current_api_v1_creator
    FirebaseIdToken::Certificates.request
    if payload.blank?
      render json: { message: 'idTokenが誤っています'}, status: 400
      return
    else
      creator = Creator.find_by(uid: payload['sub'])
    end
  end

  def authenticate_creator
    unless api_v1_creator_signed_in?
      render json: { message: 'ログインしてください' }, status: 401
      return
    end
  end

  def payload
    @payload ||= FirebaseIdToken::Signature.verify token
  end

  private

  def token
    params[:id_token] || token_from_request_headers
  end
end
