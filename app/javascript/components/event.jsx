import React from 'react'
import PropTypes from 'prop-types'
import Row from './timeslot_row'

const Event = ({
  event,
  location,
  timeslots,
  users
}) => {
  const rows = []
  const user_heading = []

  timeslots.forEach( timeslot => {
    rows.push(<Row {...timeslot} key={timeslot.id} />)
  })

  users.forEach( user => {
    user_heading.push(<th key={user.id} className='user'>{user.name}</th>)
  })

  return (
    <div className='event-container'>
      <div className='event__header'>
        <h1>{event.name}</h1>
        <h3>{location.name}</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            {user_heading}
          </tr>
        </thead>
        <tbody>
          {rows}
          <tr>
            <td><a href='/new'>Add a new time</a></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Event
