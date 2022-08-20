module AuthorizationHelper
  def sign_in(user)
    post '/api/v1/auth/sign_in', params: { session: { email: user.email, password: user.password } }
    response.headers.slice('client', 'uid', 'token-type', 'access-token')
  end
end
