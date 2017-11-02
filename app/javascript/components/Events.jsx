import React from 'react'
import PropTypes from 'prop-types'
import { prettyString } from '../utils/dateFormat'

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
          <p>{event.location}</p>
          <p>Current Best Timeslot:</p>
          <span className='events__time'>
            { event.best_timeslot ? prettyString(event.best_timeslot) : 'TBD' }
          </span>
        </a>
      )}
    </div>
  </div>

Events.propTypes = {
  events: PropTypes.array.isRequired
}

export default Events
