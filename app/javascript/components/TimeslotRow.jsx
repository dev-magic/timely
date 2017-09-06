import React from 'react'
import PropTypes from 'prop-types'
import { formatTimeslot } from '../utils/dateFormat'

const TimeSlotRow = ({ timeslot, duration, deleteTimeslot }) => {
  return (
    <tr>
      <td>
        <div className='timeslot__date'>
          <i
            className='fa fa-trash fa-lg timeslot__delete-icon'
            onClick={() => deleteTimeslot(timeslot.id)}
          />
          {formatTimeslot(timeslot.start_time, duration)}
        </div>
      </td>
      {timeslot.preferences.sort((a, b) => b.user_id - a.user_id)
                           .map(preference =>
                             <td className={preference.preference_type} key={preference.id} />
      )}
    </tr>
  )
}

TimeSlotRow.propTypes = {
  timeslot: PropTypes.object.isRequired,
  duration: PropTypes.number.isRequired,
  deleteTimeslot: PropTypes.func.isRequired
}

export default TimeSlotRow
