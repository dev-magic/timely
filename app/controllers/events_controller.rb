class EventsController < ApplicationController
  JSONResource = ActiveModelSerializers::SerializableResource

  def index
    events = Event.includes(:location)
    events_json = JSONResource.new(events).as_json
    render react_component: 'Events',
           props: {
             events:    events_json
           }
  end

  def show
    event = Event.includes(:users, timeslots: [{ preferences: :user }])
                 .find(params[:id])
    event_json = JSONResource.new(event, serializer: EventShowSerializer).as_json
    timeslots_json = JSONResource.new(event.timeslots).as_json
    users_json = JSONResource.new(event.users).as_json
    render react_component: 'Event',
           props: {
             event:     event_json,
             timeslots: timeslots_json,
             users:     users_json
           }
  end
end
