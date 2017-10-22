import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { prettyString } from '../utils/dateFormat'

class TimeslotsPreview extends Component {
  render() {
    const {
      callback,
      timeslot
    } = this.props

    return (
      <div>
        <i
          className='fa fa-trash fa-lg timeslot__delete-icon'
          onClick={callback}
        ></i>
        { prettyString(timeslot) }
      </div>
    )
  }
}

TimeslotsPreview.propTypes = {
  callback: PropTypes.func.isRequired,
  timeslot: PropTypes.string.isRequired
}

export default TimeslotsPreview
