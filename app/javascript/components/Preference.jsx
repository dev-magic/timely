import React from 'react'
import PropTypes from 'prop-types'

const Preference = ({id, preferenceType}) => (
  <td className={preferenceType} />
)

Preference.propTypes = {
  id: PropTypes.number.isRequired,
  preferenceType: PropTypes.string.isRequired
}

export default Preference
