module AuthorizationHelper
  def sign_in(user)
    post '/api/v1/auth/sign_in', params: { session: { email: user.email, password: user.password } }
    response.headers.slice('client', 'uid', 'token-type', 'access-token')
  end

  def stub_current_api_v1_creator(user)
    allow_any_instance_of(ApplicationController).to receive(:current_api_v1_creator).and_return(user)
  end

  def stub_authenticate_creator
    allow_any_instance_of(ApplicationController).to receive(:authenticate_creator).and_return(nil)
  end
end
