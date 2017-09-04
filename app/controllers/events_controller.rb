class EventsController < ApplicationController
  def index
    @events = Event.all

    @locations = @events.map do |event|
      Location.find(event[:location_id])
    end

    render react_component: 'Events',
      props: {
        events:    @events,
        locations: @locations
      }
  end

  def show
    @event = Event.find(params[:id])
    @timeslots = @event.timeslots
    @users = @event.users
    @location = Location.find(@event.location_id)

    render react_component: 'Event',
      props: {
        event:     @event,
        location:  @location,
        timeslots: @timeslots,
        users:     @users
      }
  end
end
