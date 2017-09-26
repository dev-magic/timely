import React from 'react'
import PropTypes from 'prop-types'

const preferenceTypes = ['not_filled_in', 'available', 'tentative', 'not_available', 'preferred']

const cyclePreferenceType = (preferenceType) => {
  const index = preferenceTypes.findIndex(p => p === preferenceType)
  if (index === preferenceTypes.length - 1) return preferenceTypes[0]
  else return preferenceTypes[index + 1]
}

const Preference = ({id, preferenceType, updatePreference}) => (
  <td className={preferenceType} onClick={() => updatePreference(id, cyclePreferenceType(preferenceType))} />
)

Preference.propTypes = {
  id: PropTypes.number.isRequired,
  preferenceType: PropTypes.string.isRequired,
  updatePreference: PropTypes.func.isRequired
}

export default Preference
