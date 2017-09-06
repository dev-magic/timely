class TimeslotsController < ApplicationController
  def create
    Timeslot.create!(
      event_id: params[:event_id],
      start_time: params[:start_time]
    )
    redirect_back fallback_location: "/events/#{params[:event_id]}"
  end

  def destroy
    Timeslot.find(params[:id]).destroy!
    redirect_back fallback_location: "/events/#{params[:event_id]}"
  end
end
