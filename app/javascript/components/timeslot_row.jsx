import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class TimeSlotRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fiona: props.fiona,
      gabriel: props.gabriel,
      jeremy: props.jeremy,
      kevin: props.kevin,
      kyle: props.kyle
    }

    this.toggleColor = this.toggleColor.bind(this)
  }

  toggleColor(name) {
    const colors = {
      white: 'green',
      green: 'yellow',
      yellow: 'red',
      red: 'blue',
      blue: 'white',
    }

    this.setState({ [name]: colors[this.state[name]] })
  }

  render() {
      return (
        <tr>
           <td>{ this.props.time }</td>
           <td className={ this.state.fiona } onClick={() => this.toggleColor('fiona')}></td>
           <td className={ this.state.gabriel } onClick={() => this.toggleColor('gabriel') }></td>
           <td className={ this.state.jeremy } onClick={() => this.toggleColor('jeremy') }></td>
           <td className={ this.state.kevin } onClick={() => this.toggleColor('kevin') }></td>
           <td className={ this.state.kyle } onClick={() => this.toggleColor('kyle') }></td>
        </tr>
      )
  }
}

export default TimeSlotRow
