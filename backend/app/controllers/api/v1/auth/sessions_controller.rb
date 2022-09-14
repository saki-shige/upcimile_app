class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
  def guest_sign_in
    @resource = Company.guest
    @token = @resource.create_token
    @resource.save!
    render_create_success
  end

  private

  def resource_params
    params.require(:session).permit(:email, :password)
  end
end
