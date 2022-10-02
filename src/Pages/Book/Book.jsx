import React, { useEffect, useState } from "react";
import "./Book.css";
import Rating from "@mui/material/Rating";
import NavBar from "../../Components/NavBar/NavBar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {format } from 'date-fns'
import { fetchFailure, fetchStart, fetchSuccess } from "../../redux/bookSlice";
import Comments from "../../Components/Comment/Comments";
const Book = () => {
    
  const bookId = useLocation().pathname.split("/")[2];
  const { currentBook } = useSelector((state) => state.book);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchBooks = async () => {
      dispatch(fetchStart());
      try {
        const bookRes = await axios.get(
          `http://localhost:5000/api/books/find/${bookId}`
        );
        const userRes = await axios.get(
          `http://localhost:5000/api/user/find/${bookRes.data.userId}`
        );
        setUser(userRes.data);
        dispatch(fetchSuccess(bookRes.data));
      } catch (err) {
        dispatch(fetchFailure());
      }
    };
    fetchBooks();
  }, [dispatch, bookId]);

  return (
    <>
      <NavBar />
      <div className="book-page">
        <div className="cover-img">
          <img src={currentBook.bookImg} alt="" />
        </div>
        <div className="contents">
          <h1 className="book-title">{currentBook.bookTitle}</h1>
          <p className="book-author">by {currentBook.authorName} (Author) <p>{format(
                new Date(currentBook.createdAt).getTime(),
                "dd-MM-yyyy "
              )}</p> </p>
          <div className="actions">
            <h3>{user?.name}</h3>
            <button>Buy Now</button>
          </div>
          <div className="rating">
            <Rating name="read-only" value={currentBook.rating} readOnly />
          </div>
          <h1 className="text-head">{currentBook.contentName}</h1>
          <p className="text">{currentBook.content}</p>
          <Comments bookId={currentBook?._id} />
        </div>
      </div>
    </>
  );
};

export default Book;
