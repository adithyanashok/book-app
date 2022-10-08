import axios from 'axios'
import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import {loginStart, loginSuccess, loginFailure} from '../../redux/userSlice'
import { Link } from 'react-router-dom'
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error } = useSelector((state) => state?.user);
  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(loginStart())
    try{
      const res = await axios.post('https://api-review-app.herokuapp.com/api/auth/signin/', {email, password})
      console.log(res.data)
      dispatch(loginSuccess(res.data))
      navigate('/')
    }catch (err){
      dispatch(loginFailure(err))
    }
  }
  return (
    <div className='login-page' >
        <div className="login-wrapper">
            { loading ? <h2>Signing In...</h2> : <h2>Sign In</h2>}
            <input type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
            <Link to={'/authentication-signup'}>Create an account</Link>
             {error && <p className='error-message' >Wrong email or password.</p> }
            <button onClick={handleLogin} >Signin</button>
        </div>
    </div>
  )
}

export default Login