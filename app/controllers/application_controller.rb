class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # configure devise to handle custom name field
  before_action :configure_permitted_params, if: :devise_controller?

  layout 'application'
  before_action :auth_token

  protected

  def configure_permitted_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

  def auth_token
    @auth_token ||= form_authenticity_token
  end
end
