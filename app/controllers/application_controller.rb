class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
    @timeslots = [
      {
        id: 1,
        time: '10:00AM-11:00AM',
        fiona: 'white',
        gabriel: 'white',
        jeremy: 'white',
        kevin: 'white',
        kyle: 'white'
      },
      {
        id: 2,
        time: '11:00AM-12:00PM',
        fiona: 'white',
        gabriel: 'white',
        jeremy: 'white',
        kevin: 'white',
        kyle: 'white'
      },
      {
        id: 3,
        time: '12:00PM-1:00PM',
        fiona: 'white',
        gabriel: 'white',
        jeremy: 'white',
        kevin: 'white',
        kyle: 'white'
      }
    ]

    render react_component: 'Event', props: { timeslots: @timeslots }
  end
end
