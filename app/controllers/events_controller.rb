class EventsController < ApplicationController
  def index
    events = Event.includes(:location)
    events_json = ActiveModelSerializers::SerializableResource.new(events).as_json
    render react_component: 'Events',
           props: {
             events:    events_json
           }
  end

  def show
    event = Event.includes(:users, timeslots: [{ preferences: :user }]).find(params[:id])
    event_json = ActiveModelSerializers::SerializableResource.new(event, serializer: EventShowSerializer).as_json
    timeslots_json = ActiveModelSerializers::SerializableResource.new(event.timeslots).as_json
    users_json = ActiveModelSerializers::SerializableResource.new(event.users).as_json
    render react_component: 'Event',
           props: {
             event:     event_json,
             timeslots: timeslots_json,
             users:     users_json
           }
  end
end
