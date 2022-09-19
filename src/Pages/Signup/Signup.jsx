import React from 'react'
import './Signup.css'
const Signup = () => {
  return (
    <div className='signup-page' >
      <div className="signup-wrapper">
        <h2>Sign up</h2>
        <input type="text" placeholder='Enter Name' />
        <input type="email" placeholder='Enter Email' />
        <input type="password" placeholder='Enter Password' />
        <button>Signup</button>
      </div>
    </div>
  )
}

export default Signup