// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import NavBar from "../../Components/NavBar/NavBar";
import { logout } from "../../redux/userSlice";
import "./Profile.css";
function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state?.user);
  const id = useSelector((state) => state?.user.currentUser._id);
  const handleLogout = async () => {
    const res = await makeRequest.post("/auth/logout");
    dispatch(logout());
    navigate("/");
    console.log(res);
  };
  const PF = "https://book-review-backend-production.up.railway.app/images/";
  const [books, setBook] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await makeRequest.get(`/books/find/mybooks/${id}`);
        console.log(res.data);
        setBook(res.data);
      } catch (err) {
        if(err.response.status === 401){
          const res = await makeRequest.post('/auth/logout')
          dispatch(logout())
          console.log(res.data)
        }
      }
    };
    fetchBooks();
  }, [id, dispatch]);

  return (
    <>
      <NavBar />
      <div className="profile-page">
        <img
          className="profile-image"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          alt=""
        />
        <h2>{currentUser?.name}</h2>
        <h4>{currentUser?.email}</h4>
        <div className="profile-actions">
          <Link className="profile-buttons" to="/edit-profile">
            Edit Profile
          </Link>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
      <div className="my-books">
        <h1>MY POSTS</h1>
        <Link className="add-book-button" to="/add-book">
          Post a Book
        </Link>
        <div className="my-book-row">
          {books.map((book) => (
            <Link className="book-link" key={book._id} to={`/book/${book._id}`}>
              <img className="book-card" src={PF + book.bookImg} alt="" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
