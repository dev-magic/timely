import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { dateToSeconds } from '../utils/dateFormat'
import axios from 'axios'

class AddTimeslot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      eventId: props.eventId,
      startTime: '',
      timeslots: props.timeslots,
      saving: false,
      error: false
    }

    axios.defaults.headers.common['X-CSRF-Token'] = props.authToken
    this.closeModal = props.closeModal
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ startTime: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const startTime = this.state.startTime
    const  normalizedStart = dateToSeconds(startTime)

    if (startTime == '')
      return this.setState({ error: 'Please fill out the time completely.' })
    else if (this.state.timeslots.includes(normalizedStart))
      return this.setState({ error: 'A timeslot already exists at that time.' })
    else {
      this.setState({ saving: true })

      axios.post(`/events/${this.state.eventId}/timeslots`, {
        start_time: this.state.startTime
      })
      .then(result => {
        window.location.reload(true)
      })
      .catch(err => {
        console.error(err)
        this.setState({
          saving: false,
          error: 'An error occurred. Please try again'
        })
      })
    }
  }

  render() {
    const { eventId, closeModal } = this.props

    return (
      <div className='modal__background' onClick={ closeModal }>
        <div className='modal__dialogue' onClick={(e) => e.stopPropagation()}>
          <div className='modal__header info-header'>
            Add New Timeslot
          </div>
          <div className='modal__body'>
            { this.state.saving
              ? <div className='loader' /> :
            <form onSubmit={this.handleSubmit}>
              <input
                type='datetime-local'
                name='start_time'
                className='date-input'
                value={ this.state.startTime }
                onChange={ this.handleChange }
              />
              { this.state.error ?
              <div className='error-msg'>
                { this.state.error }
              </div> : ''
              }
              <div className='confirmation-bar'>
                <input
                  type='button'
                  className='btn btn--cancel'
                  onClick={ closeModal }
                  value='Cancel'
                />
                <input
                  type='submit'
                  className='btn btn--confirm'
                  value='Submit'
                />
              </div>
            </form>
            }
          </div>
        </div>
      </div>
    )
  }
}

AddTimeslot.propTypes = {
  eventId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  timeslots: PropTypes.array.isRequired,
  authToken: PropTypes.string.isRequired
}

export default AddTimeslot
