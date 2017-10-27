
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from './TimeslotRow'
import AddTimeslot from './AddTimeslot'
import ConfirmDelete from './ConfirmDelete'
import { addTimeslot, deleteTimeslot, getEvent, updatePreference } from '../utils/api'

class EventAvailability extends Component {
  constructor (props) {
    super(props)

    this.state = {
      confirm: false,
      showModal: false,
      saving: false,
      ...props
    }

    this.confirmModal = this.confirmModal.bind(this)
    this.createTimeslot = this.createTimeslot.bind(this)
    this.deleteTimeslot = this.deleteTimeslot.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.refreshEvent = this.refreshEvent.bind(this)
    this.updatePreference = this.updatePreference.bind(this)
  }

  confirmModal (timeslotId) {
    this.setState({
      confirm: timeslotId,
      showModal: true
    })

    document.body.classList.toggle('modal-open')
  }

  createTimeslot (startTime) {
    this.setState({saving: true})

    addTimeslot(this.state.event.id,
                startTime,
                this.state.authToken)
    .then(result => {
      this.refreshEvent()
    })
    .catch(err => {
      console.error(err)
      this.refreshEvent()
    })
  }

  deleteTimeslot() {
    deleteTimeslot(
      this.state.event.id,
      this.state.confirm,
      this.state.authToken)
    .then(result => {
      this.refreshEvent()
    })
    .catch(console.error)
  }

  toggleModal () {
    this.setState({
      confirm: false,
      showModal: !this.state.showModal
    })

    document.body.classList.toggle('modal-open')
  }

  updatePreference (id, preferenceType) {
    updatePreference(id, preferenceType, this.props.authToken)
    .then(
      // Optimistically update
    )
    .catch( err => {
      console.error(err)
      // If update fails, reset preference to value in db
      this.refreshEvent()
    })
  }

  refreshEvent () {
    getEvent(this.state.event.slug)
    .then( result => {
      this.setState({ ...result.data, saving: false })
    })
    .catch(console.error)
  }

  render () {
    const { event, users, timeslots, authToken, saving } = this.state
    const modal = this.state.confirm
      ? <ConfirmDelete
          closeModal={this.toggleModal}
          callback={this.deleteTimeslot}
        />
      : <AddTimeslot
          callback={this.createTimeslot}
          closeModal={this.toggleModal}
          timeslots={timeslots.map(timeslot => timeslot.start_time)}
        />

    return (
      <div className='event-container'>
        { saving &&
          <div className="loader-bg">
            <div className="loader"></div>
          </div>
        }
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
                      <th key={user.id} className='user-table-header'>{user.name}</th>
              )}
            </tr>
          </thead>
          <tbody>
            { timeslots.sort((a, b) => a.start_time - b.start_time)
                      .map(timeslot =>
                        <Row
                          confirmModal={this.confirmModal}
                          duration={event.duration_minutes}
                          key={timeslot.id}
                          timeslot={timeslot}
                          users={users}
                          updatePreference={this.updatePreference}
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

EventAvailability.propTypes = {
  authToken: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  timeslots: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
}

export default EventAvailability
