import React from 'react'
import './Login.css'
const Login = () => {
  return (
    <div className='login-page' >
        <div className="login-wrapper">
            <h2>Sign In</h2>
            <input type="email" placeholder='Enter Email' />
            <input type="password" placeholder='Enter Password' />
            <button>Signin</button>
        </div>
    </div>
  )
}

export default Login