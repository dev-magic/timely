import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDuration } from '../utils/dateFormat'

class Event extends Component {

  render() {
    const {
      name,
      duration_minutes,
      location
    } = this.props.event

    const { event, users } = this.props

    return (
      <div className='card-container'>
        <div className='card-body'>
          <h1 className='event-title'>{ name } <i className='fa fa-pencil edit-event'></i></h1>
          <div className='card-fields'>
            <div className='event-field event-duration'>
              <i className='fa fa-2x fa-clock-o'></i>
              { formatDuration(duration_minutes) }
            </div>
            <div className='event-field'><i className='fa fa-2x fa-map-marker'></i> { location }</div>
            <div className='event-field event-final-time'>
              Scheduled Time: { event.time || 'TBD' }
            </div>
            <a href={`/events/${event.slug}?availability=edit`}>
              <button className='fill-in-availability-button btn'>
                Fill In Your Availability
              </button>
            </a>
            <h2 className='event-attendees no-margin'>Attendees:</h2>
            <ul className='user-list no-margin'>
            { users.map( (user, i) =>
              <li className='avatar' key={i}>
                <img src='/images/user.png' alt='user pic' /> {user.name}
              </li>
            )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

Event.propTypes = {
  authToken: PropTypes.string,
  event: PropTypes.object.isRequired,
  timeslots: PropTypes.array,
  users: PropTypes.array.isRequired
}

export default Event
