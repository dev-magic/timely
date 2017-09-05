import React from 'react'

const Nav = () =>
  <nav>
    <div className='logo'>
      <a href='/'>Let's Meet Up!</a>
    </div>

    <div className='spacer' />

    <div className='auth-bar'>
      <button className='btn'>
        Sign Up
      </button>
      <button className='btn'>
        Sign In
      </button>
    </div>
  </nav>

export default Nav
