import React from 'react'
import PropTypes from 'prop-types'

const Nav = (props) =>
  <nav>
    <div className='logo'>
      <a href='/'>Let's Meet Up!</a>
    </div>

    <div className='spacer'></div>

    <div className='auth-bar'>
      <button>
        Sign Up
      </button>
      <button>
        Sign In
      </button>
    </div>
  </nav>


export default Nav
