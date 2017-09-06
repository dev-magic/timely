import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class AddTimeslot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      eventId: props.eventId,
      startTime: '',
      saving: false,
      error: false,
      authToken: props.authToken
    }

    this.closeModal = props.closeModal
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ startTime: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({ saving: true })

    axios({
      method: 'post',
      url: `/events/${this.state.eventId}/timeslots`,
      headers: {
        'X-CSRF-Token': this.state.authToken
      },
      data: {
        start_time: this.state.startTime,
      }
    })
      .then( () => {
        this.closeModal()
      })
      .catch(error => {
        this.setState({ saving: false, error: true })
        console.error(error)
      })
  }

  render() {
    const { eventId, closeModal, authToken } = this.props

    return (
      <div className='modal__background' onClick={ closeModal }>
        <div className='modal__dialogue' onClick={(e) => e.stopPropagation()}>
          <div className='modal__header'>
            Add New Timeslot
          </div>
          <div className='modal__body'>
            { this.state.saving
              ? <div className='loader' /> :
            <form onSubmit={ this.handleSubmit } >
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
