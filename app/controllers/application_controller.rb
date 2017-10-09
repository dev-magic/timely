class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # configure devise to handle custom name field
  before_action :configure_permitted_params, if: :devise_controller?

  layout 'application'
  before_action :auth
  skip_before_action :auth, if: :devise_controller?

  protected

  def after_sign_in_path_for(*)
    events_path
  end

  def configure_permitted_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

  def auth
    if current_user
      @auth_token ||= form_authenticity_token
      @current_user = current_user
    else
      @flash_message = 'Please sign in first'
      render :landing
    end
  end
end
