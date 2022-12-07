// import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import "./Signup.css";
// import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import NavBar from "../../Components/NavBar/NavBar";

const EditProfile = () => {
//   const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading, currentUser } = useSelector((state) => state?.user);

  const Update = async (e) => {
    e.preventDefault();
    dispatch(loginStart);
    try {
      const res = await makeRequest.put(`/user/${currentUser._id}`, {
        name,
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      window.location.replace("/profile");
    } catch (err) {
      dispatch(loginFailure(err));
      setError(err.response.data);
    }
  };
  return (
    <>
      <NavBar />
      <div className="signup-page">
        <div className="signup-wrapper">
          {loading ? <h2>Updating profile...</h2> : <h2>Edit Profile</h2>}
          <p className="error-message">{error}</p>
          <input
            type="text"
            placeholder={currentUser.name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder={currentUser.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={Update}>Edit</button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
