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
      showModal: false,
      confirm: false,
      ...props
    }

    this.toggleModal = this.toggleModal.bind(this)
    this.deleteTimeslot = this.deleteTimeslot.bind(this)
    this.refreshEvent = this.refreshEvent.bind(this)
  }

  toggleModal () {
    this.setState({
      showModal: !this.state.showModal,
      confirm: false
    })

    document.getElementsByTagName('body')[0].classList.toggle('modal-open')
  }

  deleteTimeslot (timeslotId) {
    this.setState({
      showModal: true,
      confirm: timeslotId
    })

    document.getElementsByTagName('body')[0].classList.toggle('modal-open')
  }

  refreshEvent () {
    getEvent(this.state.event.id)
    .then(result => {
      this.setState({ ...result.data })
    })
    .catch(err => console.error(err))
  }

  render () {
    const { event, users, timeslots, authToken } = this.state

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
                          key={timeslot.id}
                          timeslot={timeslot}
                          users={users}
                          duration={event.duration_minutes}
                          deleteTimeslot={this.deleteTimeslot}
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

        { this.state.showModal
          ? this.state.confirm
          ? <ConfirmDelete
            eventId={event.id}
            timeslotId={this.state.confirm}
            authToken={authToken}
            closeModal={this.toggleModal}
            refreshEvent={this.refreshEvent}
          />
          : <AddTimeslot
            eventId={event.id}
            closeModal={this.toggleModal}
            timeslots={timeslots.map(timeslot => timeslot.start_time)}
            authToken={authToken}
            refreshEvent={this.refreshEvent}
          /> : ''
        }
      </div>
    )
  }
}

Event.propTypes = {
  event: PropTypes.object.isRequired,
  timeslots: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  authToken: PropTypes.string.isRequired
}

export default Event
