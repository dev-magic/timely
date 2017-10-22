import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ConfirmDelete extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.callback()
    this.props.closeModal()
  }

  render () {
    const {
      closeModal
    } = this.props

    return (
      <div className='modal__background' onClick={closeModal}>
        <div className='modal__dialogue' onClick={(e) => e.stopPropagation()}>
          <div className='modal__header warning-header'>
            Delete Timeslot?
          </div>
          <div className='modal__body'>
            <form onSubmit={this.handleSubmit}>
              <div className='confirmation-bar'>
                <input
                  type='button'
                  className='btn btn--confirm'
                  onClick={closeModal}
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
    )
  }
}

ConfirmDelete.propTypes = {
  callback: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default ConfirmDelete
