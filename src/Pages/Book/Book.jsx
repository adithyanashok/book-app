import React, { useEffect, useState } from "react";
import "./Book.css";
import Rating from "@mui/material/Rating";
import NavBar from "../../Components/NavBar/NavBar";
// import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { fetchFailure, fetchStart, fetchSuccess } from "../../redux/bookSlice";
import Comments from "../../Components/Comment/Comments";
import { makeRequest } from "../../axios";
const Book = () => {
  const [bookres, setBookRes] = useState({});
  const PF = "http://localhost:5000/images/";
  const bookId = useLocation().pathname.split("/")[2];
  const { currentBook } = useSelector((state) => state.book);
  const { currentUser } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchBooks = async () => {
      dispatch(fetchStart());
      try {
        const bookRes = await makeRequest.get(`/books/find/${bookId}`);
        setBookRes(bookRes.data);
        console.log(bookRes.data);
        dispatch(fetchSuccess(bookRes.data));
        const userRes = await makeRequest.get(
          `/user/find/${bookRes.data.userId}`
        );
        console.log(userRes.data);
        setUser(userRes.data);
      } catch (err) {
        dispatch(fetchFailure());
      }
    };
    fetchBooks();
  }, [dispatch, bookId]);
  const owner = bookres?.userId === currentUser?._id;
  const deleteBook = async () => {
    try {
      await makeRequest.delete(`/books/${bookId}`);
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <NavBar />

      <div className="book-page">
        <div className="cover-img">
          {bookres?.bookImg && (
            <img src={PF + bookres?.bookImg} alt={currentBook?.bookTitle} />
          )}
        </div>
        <div className="contents">
          <h1 className="book-title">{currentBook?.bookTitle}</h1>
          <p className="book-author">
            by {currentBook?.authorName} (Author) -{" "}
            {format(currentBook?.createdAt)}
          </p>
          <div className="actions">
            <h3>{user?.name}</h3>
            <a className="link" href={bookres.bookLink}>
              Buy Now
            </a>
            {owner && (
              <>
                {" "}
                <Link className="update-button" to={`/update-book/${bookId}`}>
                  Update
                </Link>
                <button className="delete-button" onClick={deleteBook}>
                  Delete
                </button>{" "}
              </>
            )}
          </div>
          <div className="rating">
            <Rating name="read-only" value={currentBook?.rating} readOnly />
          </div>
          <h1 className="text-head">{currentBook?.contentName}</h1>
          <p className="text">{currentBook?.content}</p>
          <Comments bookId={currentBook?._id} />
        </div>
      </div>
    </>
  );
};

export default Book;
