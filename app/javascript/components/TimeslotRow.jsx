import React from 'react'
import PropTypes from 'prop-types'
import { formatTimeslot } from '../utils/dateFormat'
import Preference from './Preference'

const TimeSlotRow = ({ timeslot, duration, confirmModal, updatePreference }) => {

  return (
    <tr>
      <td>
        <div className='timeslot__date'>
          <i
            className='fa fa-trash fa-lg timeslot__delete-icon'
            onClick={() => confirmModal(timeslot.id)}
          ></i>
          { formatTimeslot(timeslot.start_time, duration) }
        </div>
      </td>
      { timeslot.preferences.sort((a, b) => b.user_id - a.user_id)
                           .map(preference =>
                             <Preference key={preference.id}
                                         id={preference.id}
                                         preferenceType={preference.preference_type}
                                         updatePreference={updatePreference}
                             />
      )}
    </tr>
  )
}

TimeSlotRow.propTypes = {
  confirmModal: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  timeslot: PropTypes.object.isRequired,
  updatePreference: PropTypes.func.isRequired
}

export default TimeSlotRow
