import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddTimeslot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      eventId: props.eventId,
      startTime: ''
    }

    this.closeModal = props.closeModal
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ startTime: e.target.value })
  }

  render() {
    const { eventId, closeModal, authToken } = this.props

    return (
      <div className='modal__background' onClick={ closeModal }>
        <div className='modal__dialogue' onClick={(e) => e.stopPropagation()}>
          <div className='modal__header info-header'>
            Add New Timeslot
          </div>
          <div className='modal__body'>
            { this.state.saving
              ? <div className='loader' /> :
            <form action={`/events/${eventId}/timeslots`} method='POST'>
              <input
                type='hidden'
                name='authenticity_token'
                value={ authToken }
              />
              <input
                type='datetime-local'
                name='start_time'
                className='date-input'
                value={ this.state.startTime }
                onChange={ this.handleChange }
              />
              { this.state.error ?
              <div className='error-msg'>
                There was an error. Please try again.
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
  authToken: PropTypes.string.isRequired
}

export default AddTimeslot
