import React from 'react'

const Events = ({
  events,
  locations
}) =>
  <div>
    <h1>Upcoming Events</h1>

    <div className='events-container'>
      {events.map((event, i) =>
        <a
          href={'/events/' + event.id}
          key={event.id}
          className='event-card'
        >
          <h2 className='event-title'>{event.name}</h2>
          <p>{locations[i].name}</p>
        </a>
      )}
    </div>
  </div>

export default Events
