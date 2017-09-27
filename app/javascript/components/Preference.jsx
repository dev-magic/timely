import React, { Component } from 'react'
import PropTypes from 'prop-types'

const preferenceTypes = [
  'not_filled_in',
  'available',
  'tentative',
  'not_available',
  'preferred'
]

class Preference extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.id,
      preferenceType: props.preferenceType
    }

    this.cyclePreferenceType = this.cyclePreferenceType.bind(this)
    this.updatePreference = props.updatePreference.bind(this)
  }

  componentWillReceiveProps(nextProps)  {
    this.setState({ preferenceType: nextProps.preferenceType })
  }

  cyclePreferenceType(preferenceType) {
    const nextIndex = (preferenceTypes.indexOf(preferenceType) + 1) % 5
    const nextPref = preferenceTypes[nextIndex]

    this.setState({ preferenceType: nextPref })
    this.updatePreference(this.state.id, nextPref)
  }

  render() {
    return (
      <td
        className={this.state.preferenceType}
        onClick={() => this.cyclePreferenceType(this.state.preferenceType)}
      />
  )}
}

Preference.propTypes = {
  id: PropTypes.number.isRequired,
  preferenceType: PropTypes.string.isRequired,
  updatePreference: PropTypes.func.isRequired
}

export default Preference
