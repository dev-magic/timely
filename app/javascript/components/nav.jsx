import React from 'react'

const Nav = () =>
  <nav>
    <div className='logo'>
      <a href='/'>Let's Meet Up!</a>
    </div>

    <div className='spacer' />

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
