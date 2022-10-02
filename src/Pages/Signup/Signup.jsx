import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice'
import './Signup.css'
const Signup = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const signIn = async (e) => {
    e.preventDefault()
    dispatch(loginStart)
    try{
      const res = await axios.post('https://api-review-app.herokuapp.com/api/auth/signup', {name, email, password})
      dispatch(loginSuccess(res.data))
    } catch (err){
      dispatch(loginFailure(err))
    }
  }
  return (
    <div className='signup-page' >
      <div className="signup-wrapper">
        <h2>Sign up</h2>
        <input type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
        <a href="/login">Already have an account?</a>
        <button onClick={signIn} >Signup</button>
      </div>
    </div>
  )
}

export default Signup