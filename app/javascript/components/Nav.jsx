import React, { Component } from 'react'

class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showSignout: false
    }

    this.toggleSignout = this.toggleSignout.bind(this)
  }

  toggleSignout() {
    this.setState({ showSignout: !this.state.showSignout })
  }

  render() {
    const { authToken, currentUser } = this.props

    const signInButtons = (
      <div>
        <a href={"/users/sign_up"}>
          <button className='btn'>
            Sign Up
          </button>
        </a>
        <a href={"/users/sign_in"}>
          <button className='btn'>
            Sign In
          </button>
        </a>
      </div>
    )

    const toggleArrow = this.state.showSignout ? 'fa-sort-up' : 'fa-sort-down'
    const showSignout = this.state.showSignout ? 'show-signout' : ''

    const signOutButton = (
      <div className='greeting-bar'>
        <div
          className='greeting'
          onClick={ this.toggleSignout }
        >
          <i className='fa fa-user'/>
          <p className='greeting-msg'>
            Hello, { currentUser ? currentUser.name : '' }!
          </p>
          <i className={`fa ${toggleArrow} signout-arrow`}
          />
        </div>
        <form
          method='POST'
          action='/users/sign_out'
          className={`signout-form ${showSignout}`}
        >
          <input
            type='hidden'
            name='_method'
            value='delete'
          />
          <input
            type='hidden'
            name='authenticity_token'
            value={ authToken }
          />
          <input
            type='submit'
            value='Sign Out'
            className='signout'
          />
        </form>
      </div>
    )

    return (
      <nav className='navbar'>
        <div className='logo'>
          <a href='/'>Let's Meet Up!</a>
        </div>

        <div className='auth-bar'>
        { currentUser
        ? signOutButton
        : signInButtons
        }
        </div>
      </nav>
    )
  }
}

export default Nav
