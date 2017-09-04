import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

const formatTime = (timeInMs) => (
  format(new Date(timeInMs * 1000), ['YYYY-MM-DD HH:mm'])
)

const TimeSlotRow = ({timeslot}) => {
  return (
    <tr>
      <td>{formatTime(timeslot.start_time)}</td>
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
