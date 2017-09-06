import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class ConfirmDelete extends Component {
  constructor(props) {
    super(props)

    this.state = {
      eventId: props.eventId,
      timeslotId: props.timeslotId,
      deleting: false,
      error: false
    }

    axios.defaults.headers.common['X-CSRF-Token'] = props.authToken
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({ deleting: true })

    const params = new URLSearchParams()
    params.append('_method', 'delete')

    axios.post(
      `/events/${this.state.eventId}/timeslots/${this.state.timeslotId}`,
      params
    )
    .then(result => {
      window.location.reload(true)
    })
    .catch(err => {
      console.error(err)
      this.setState({
        deleting: false,
        error: true
      })
    })
  }

  render() {
   const {
     eventId,
     timeslotId,
     authToken,
     closeModal
   } = this.props

   return (
      <div className='modal__background' onClick={ closeModal }>
        <div className='modal__dialogue' onClick={(e) => e.stopPropagation()}>
          <div className='modal__header warning-header'>
            Delete Timeslot?
          </div>
          <div className='modal__body'>
            <form onSubmit={ this.handleSubmit }>
              { this.state.deleting ?
                <div className='loader' /> :
                <div className='confirmation-bar'>
                  <input
                    type='button'
                    className='btn btn--confirm'
                    onClick={ closeModal }
                    value='Cancel'
                  />
                  <input
                    type='submit'
                    className='btn btn--cancel'
                    value='Delete'
                  />
                { this.state.error ?
                  <div className='error-msg'>
                    There was an error. Please try again.
                  </div> : ''
                }
                </div>
              }
            </form>
          </div>
        </div>
      </div>
  )}
}

ConfirmDelete.propTypes = {
  eventId: PropTypes.number.isRequired,
  timeslotId: PropTypes.number.isRequired,
  authToken: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default ConfirmDelete
