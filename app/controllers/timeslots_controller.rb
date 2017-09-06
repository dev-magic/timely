class TimeslotsController < ApplicationController
  def create
    @timeslot = Timeslot.create!(event_id: params[:event_id], start_time: params[:start_time])

    redirect_back fallback_location: "/events/#{params[:event_id]}"
  end
end
