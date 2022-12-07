// import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import "./Signup.css";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";

const Signup = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading } = useSelector((state) => state?.user);

  const signIn = async (e) => {
    e.preventDefault();
    dispatch(loginStart);
    try {
      const res = await makeRequest.post(
        "/auth/signup",
        { name, email, password },
        { withCredentials: true }
      );
      dispatch(loginSuccess(res.data));
      window.location.replace("/");
    } catch (err) {
      dispatch(loginFailure(err));
      setError(err.response.data);
    }
  };
  return (
    <div className="signup-page">
      <div className="signup-wrapper">
        {loading ? <h2>Creating account...</h2> : <h2>Signup</h2>}
        <p className="error-message">{error}</p>
        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <Link to={"/login"}>Already have an account?</Link>

        <button onClick={signIn}>Signup</button>
      </div>
    </div>
  );
};

export default Signup;
