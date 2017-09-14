import React, { Component } from 'react'

  const Nav = ({ authToken }) =>
    <nav className='navbar'>
      <div className='logo'>
        <a href='/'>Let's Meet Up!</a>
      </div>

      <div className='auth-bar'>
        <a href={"users/sign_up"}>
          <button className='btn'>
            Sign Up
          </button>
        </a>
        <a href={"users/sign_in"}>
          <button className='btn'>
            Sign In
          </button>
        </a>
        <form method='POST' action="users/sign_out">
          <input type='hidden' name='authenticity_token' value={ authToken } />
          <input type='submit' value='Sign Out' className='btn'/>
        </form>
      </div>
    </nav>

 export default Nav
