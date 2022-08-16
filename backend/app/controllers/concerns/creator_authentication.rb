module CreatorAuthentication
  extend ActiveSupport::Concern
  include Firebase::Auth::Authenticable

  def authenticate_creator
    authenticate_user!
  end
end
