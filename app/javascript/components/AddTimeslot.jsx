import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { dateToSeconds } from '../utils/dateFormat'

class AddTimeslot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      timeslots: props.timeslots,
      startTime: '',
      error: false
    }

    this.parent = props.parent
    this.closeModal = props.closeModal
    this.callback = props.callback
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({ startTime: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    const startTime = this.state.startTime
    const normalizedStart = this.parent == "new_event"
      ? startTime
      : dateToSeconds(startTime)

    if (startTime === '') {
      return this.setState({ error: 'Please fill out the time completely.' })
    } else if (this.state.timeslots.indexOf(normalizedStart) !== -1) {
       return this.setState({ error: 'A timeslot already exists at that time.' })
    } else if (new Date(startTime) < Date.now()) {
     return this.setState({ error: 'Timeslot must be in the future.' })
    } else {
      this.callback(startTime)
      this.closeModal()
    }
  }

  render () {
    const { closeModal } = this.props

    return (
      <div className='modal__background' onClick={closeModal}>
        <div className='modal__dialogue' onClick={(e) => e.stopPropagation()}>
          <div className='modal__header info-header'>
            Add New Timeslot
          </div>
          <div className='modal__body'>
            <form onSubmit={this.handleSubmit} noValidate >
              <input
                type='datetime-local'
                name='startTime'
                className='date-input'
                value={this.state.startTime}
                onChange={this.handleChange}
              />
              { this.state.error
              ? <div className='error-msg'>
                  { this.state.error }
                </div>
              : ''
              }
              <div className='confirmation-bar'>
                <input
                  type='button'
                  className='btn btn--cancel'
                  onClick={closeModal}
                  value='Cancel'
                />
                <input
                  type='submit'
                  id='timeslot-submit'
                  className='btn btn--confirm'
                  value='Submit'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

AddTimeslot.propTypes = {
  callback: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  timeslots: PropTypes.array.isRequired,
  parent: PropTypes.string
}

export default AddTimeslot
