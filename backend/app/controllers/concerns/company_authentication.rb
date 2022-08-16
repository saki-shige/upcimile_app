module CompanyAuthentication
  extend ActiveSupport::Concern
  include DeviseTokenAuth::Concerns::SetUserByToken

  def authenticate_company
    authenticate_user
  end
end
