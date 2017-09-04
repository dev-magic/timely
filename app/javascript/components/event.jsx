import React from 'react'
import PropTypes from 'prop-types'
import Row from './timeslot_row'

const Event = ({event, location, timeslots, users}) => {
  return (
    <div className='event-container'>
      <div className='event__header'>
        <h1>{event.name}</h1>
        <h3>{location.name}</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th />
            {users.map(user =>
              <th key={user.id} className='user'>{user.name}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {timeslots.map(timeslot =>
            <Row {...timeslot} key={timeslot.id} />
          )}
          <tr>
            <td><a href='/new'>Add a new time</a></td>
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

Event.propTypes = {
  event: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  timeslots: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
}

export default Event
