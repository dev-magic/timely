import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from './TimeslotRow'
import AddTimeslot from './AddTimeslot'
import ConfirmDelete from './ConfirmDelete'
import { getEvent } from '../utils/api'

class Event extends Component {
  constructor (props) {
    super(props)

    this.state = {
      confirm: false,
      showModal: false,
      ...props
    }

    this.confirmModal = this.confirmModal.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.refreshEvent = this.refreshEvent.bind(this)
  }

  confirmModal (timeslotId) {
    this.setState({
      confirm: timeslotId,
      showModal: true
    })

    document.getElementsByTagName('body')[0].classList.toggle('modal-open')
  }

  toggleModal () {
    this.setState({
      confirm: false,
      showModal: !this.state.showModal
    })

    document.getElementsByTagName('body')[0].classList.toggle('modal-open')
  }

  refreshEvent () {
    getEvent(this.state.event.id)
    .then(result => {
      this.setState({ ...result.data })
    })
    .catch(console.error)
  }

  render () {
    const { event, users, timeslots, authToken } = this.state
    const modal = this.state.confirm
      ? <ConfirmDelete
          authToken={authToken}
          closeModal={this.toggleModal}
          eventId={event.id}
          refreshEvent={this.refreshEvent}
          timeslotId={this.state.confirm}
        />
      : <AddTimeslot
          authToken={authToken}
          closeModal={this.toggleModal}
          eventId={event.id}
          refreshEvent={this.refreshEvent}
          timeslots={timeslots.map(timeslot => timeslot.start_time)}
        />

    return (
      <div className='event-container'>
        <div className='event__header'>
          <h1 className='text--header'>{event.name}</h1>
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
                          confirmModal={this.confirmModal}
                          duration={event.duration_minutes}
                          key={timeslot.id}
                          timeslot={timeslot}
                          users={users}
                        />
            )}
          </tbody>
        </table>
        <button
          className='new-timeslot btn'
          onClick={this.toggleModal}
        >
          Add New Timeslot
        </button>

        { this.state.showModal ? modal : '' }
      </div>
    )
  }
}

Event.propTypes = {
  authToken: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  timeslots: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
}

export default Event
