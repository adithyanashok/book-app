import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error } = useSelector((state) => state?.user);

  const signIn = async (e) => {
    e.preventDefault()
    dispatch(loginStart)
    try{
      const res = await axios.post('https://api-review-app.herokuapp.com/api/auth/signup', {name, email, password})
      dispatch(loginSuccess(res.data))
      navigate('/')
    } catch (err){
      dispatch(loginFailure(err))
    }
  }
  return (
    <div className='signup-page' >
      <div className="signup-wrapper">
        {loading ? <h2>Creating account...</h2> :<h2>Sign up</h2>}
        <input type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
        <Link to={'/authentication-login'}>Already have an account?</Link>
        {error && <p className='error-message' >Wrong email or password.</p> }
        
        <button onClick={signIn} >Signup</button>
      </div>
    </div>
  )
}

export default Signup