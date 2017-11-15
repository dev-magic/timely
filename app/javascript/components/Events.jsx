import React from 'react'
import PropTypes from 'prop-types'

const Events = ({events}) =>
  <div>
    <a id='new-event' href='/events/new' className='add-event-btn btn'>
      Create New Event
    </a>
    <h1 className='text--header'>Upcoming Events</h1>

    <div className='events-container'>
      {events.map((event) =>
        <a
          href={'/events/' + event.slug}
          key={event.id}
          className='event-card'
        >
          <h2 className='event-title'>{event.name}</h2>
          <div className='event-card-body'>
            <div className='event-field event-card-info'>
              <i className='fa fa-2x fa-map-marker event-card-map'></i>
              { event.location }
            </div>
              <div className='event-field event-final-time event-card-info'>
              <i className='fa fa-2x fa-clock-o event-card-clock'></i>
               { event.time || 'TBD' }
            </div>
          </div>
        </a>
      )}
    </div>
  </div>

Events.propTypes = {
  events: PropTypes.array.isRequired
}

export default Events
