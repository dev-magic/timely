class PreferencesController < ApplicationController
  def update
    preference = Preference.find(params[:id])
    preference.update(update_params)
    preference.save
  end

  def update_params
    params.permit(:preference_type)
  end
end
