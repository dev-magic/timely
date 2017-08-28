import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Row from './timeslot_row'

class Event extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const rows = []

    this.props.timeslots.forEach( timeslot => {
      rows.push(<Row {...timeslot} key={timeslot.id} />)
    })

    return (
      <div className='main'>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='user'>Fiona</th>
              <th className='user'>Gabriel</th>
              <th className='user'>Jeremy</th>
              <th className='user'>Kevin</th>
              <th className='user'>Kyle</th>
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
}

export default Event
