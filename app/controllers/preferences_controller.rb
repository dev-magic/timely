class PreferencesController < ApplicationController
  def update
    preference = Preference.find(params[:id])
    preference.update(preference_type: params[:preference_type])
    preference.save
    head :ok
  end

  def update_params
    params.permit(:preference_type)
  end
end
