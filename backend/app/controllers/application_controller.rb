class ApplicationController < ActionController::Base
  include CompanyAuthentication
  include CreatorAuthentication
  skip_before_action :verify_authenticity_token
end
