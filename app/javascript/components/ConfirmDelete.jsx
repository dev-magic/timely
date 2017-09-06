import React, { Component } from 'react'
import PropTypes from 'prop-types'

const ConfirmDelete = ({ eventId, timeslotId, authToken, closeModal }) =>
  <div className='modal__background' onClick={ closeModal }>
    <div className='modal__dialogue' onClick={(e) => e.stopPropagation()}>
      <div className='modal__header warning-header'>
        Delete Timeslot?
      </div>
      <div className='modal__body'>
        <form
          action={`/events/${eventId}/timeslots/${timeslotId}`}
          method='POST'
        >
          <input
            type="hidden"
            name="_method"
            value="delete"
          />
          <input
            type='hidden'
            name='authenticity_token'
            value={ authToken }
          />
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
          </div>
        </form>
      </div>
    </div>
  </div>

ConfirmDelete.propTypes = {
  eventId: PropTypes.number.isRequired,
  timeslotId: PropTypes.number.isRequired,
  authToken: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default ConfirmDelete
