import React from 'react'

const Nav = ({ authToken, currentUser }) => {
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

  const signOutButton = (
    <div className='greeting-bar'>
      <i className='fa fa-user greeting'/>
      <p className='greeting'>
        Hello, { currentUser ? currentUser.name : '' }!
      </p>
      <form
        method='POST'
        action="/users/sign_out"
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
          className='sign-out btn'
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

 export default Nav
