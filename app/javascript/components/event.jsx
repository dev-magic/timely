import React from 'react'
import PropTypes from 'prop-types'
import Row from './timeslot_row'

const Event = ({event, users, timeslots}) => {
  return (
    <div className='event-container'>
      <div className='event__header'>
        <h1>{event.name}</h1>
        <h3>{event.location}</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th />
            {users.sort((a, b) => b.id - a.id)
                  .map(user =>
                    <th key={user.id} className='user'>{user.name}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {timeslots.sort((a, b) => a.start_time - b.start_time)
                    .map(timeslot =>
                      <Row
                        key={timeslot.id}
                        timeslot={timeslot}
                        users={users}
                        duration={event.duration_minutes}
                      />
          )}
        </tbody>
      </table>
      <form action='/new'>
        <input
          className='new-timeslot btn'
          type='submit'
          value='Add New Timeslot'
        />
      </form>
    </div>
  )
}

Event.propTypes = {
  event: PropTypes.object.isRequired,
  timeslots: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
}

export default Event
