import React from 'react'
import PropTypes from 'prop-types'
import { formatTimeslot } from '../utils/dateFormat'

const TimeSlotRow = ({timeslot, duration}) => {
  return (
    <tr>
      <td>{formatTimeslot(timeslot.start_time, duration)}</td>
      {timeslot.preferences.sort((a, b) => b.user_id - a.user_id)
                           .map(preference =>
                             <td className={preference.preference_type} key={preference.id} />
      )}
    </tr>
  )
}

TimeSlotRow.propTypes = {
  timeslot: PropTypes.object.isRequired
}

export default TimeSlotRow
