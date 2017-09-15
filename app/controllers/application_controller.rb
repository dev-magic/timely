class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # configure devise to handle custom name field
  before_action :configure_permitted_params, if: :devise_controller?

  layout 'application'
  before_action :auth

  protected

  def after_sign_in_path_for(*)
    events_path
  end

  def configure_permitted_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

  def auth
    @auth_token ||= form_authenticity_token
    @current_user ||= current_user
  end
end
