// import axios from "axios";
import React, { useState } from "react";
import "./Login.css";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../redux/userSlice";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
const Login = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading } = useSelector((state) => state?.user);
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await makeRequest.post(
        "/auth/signin/",
        { email, password },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(loginSuccess(res.data));
      window.location.replace("/");
    } catch (err) {
      console.log(err);
      dispatch(loginFailure(err));
      setError(err.response.data);
    }
  };
  return (
    <div className="login-page">
      <div className="login-wrapper">
        {loading ? <h2>Signing In...</h2> : <h2>SignIn</h2>}
        <p className="error-message">{error}</p>
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to={"/signup"}>Don't have an account?</Link>
        <button onClick={handleLogin}>Signin</button>
      </div>
    </div>
  );
};

export default Login;
