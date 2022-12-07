import React, { useEffect, useState } from "react";
import "./Books.css";
// import { Link } from "react-router-dom";
// import axios from "axios";
import { makeRequest } from "../../axios";
const Books = () => {
  const [books, setBooks] = useState([]);
  const PF = "http://localhost:5000/images/";
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await makeRequest.get("/books");
        console.log(res.data);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="books-section">
      <div className="books-wrapper">
        {books.map((book) => (
          <a key={book._id} href={`/book/${book._id}`}>
            <img
              className="book-card"
              src={PF + book.bookImg}
              alt={book.bookTitle}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Books;
