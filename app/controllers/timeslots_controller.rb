class TimeslotsController < ApplicationController
  def create
    Timeslot.create!(
      event_id: params[:event_id],
      start_time: params[:start_time]
    )
  end

  def destroy
    Timeslot.find(params[:id]).destroy!
  end
end
