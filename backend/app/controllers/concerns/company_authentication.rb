module CompanyAuthentication
  extend ActiveSupport::Concern
  include DeviseTokenAuth::Concerns::SetUserByToken

  def authenticate_company
    unless api_v1_company_signed_in?
      render json: { message: 'ログインしてください' }, status: 401
      return
    end
  end
end
