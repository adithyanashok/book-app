// import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeRequest } from "../../axios";
import NavBar from "../../Components/NavBar/NavBar";
import { logout } from "../../redux/userSlice";
import "./UpdateBook.css";
function UpdateBook() {
  const [bookTitle, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(0);
  const [bookLink, setAffilateLink] = useState("");
  const [contentName, setContentName] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [link, setLink] = useState("");
  const [contents, setContents] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch()
  const { currentBook } = useSelector((state) => state.book);
  const handleClick = async (e) => {
    e.preventDefault();
    const newBook = {
      bookTitle,
      authorName,
      rating,
      bookLink,
      contentName,
      content,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newBook.bookImg = filename;
      try {
        await makeRequest.put("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await makeRequest.put(`/books/${currentBook._id}`, newBook);
      console.log(res.data);
      window.location.replace("http://localhost:3000/book/" + res.data._id);
    } catch (err) {
      if(err.response.status === 401){
        const res = await makeRequest.post('/auth/logout')
        dispatch(logout())
        console.log(res.data)
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="update-books">
        <div className="update-book">
          <h1>Update a book</h1>
          <input
            type="text"
            value={title}
            onClick={() => setTitle(currentBook?.bookTitle)}
            placeholder={currentBook?.bookTitle}
            onChange={(e) => setBookName(e.target.value)}
          />
          <input
            type="text"
            value={author}
            onClick={() => setAuthor(currentBook?.authorName)}
            placeholder={currentBook?.authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
          <label for="rating">Rating:</label>
          <select onChange={(e) => setRating(e.target.value)} name="rating">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <input
            type="text"
            value={link}
            onClick={() => setLink(currentBook?.bookLink)}
            placeholder={currentBook?.bookLink}
            onChange={(e) => setAffilateLink(e.target.value)}
          />
          <input
            type="text"
            value={contents}
            onClick={() => setContents(currentBook?.contentName)}
            placeholder={currentBook?.contentName}
            onChange={(e) => setContentName(e.target.value)}
          />
          <textarea
            name="content"
            value={text}
            onClick={() => setText(currentBook?.content)}
            placeholder={currentBook?.content}
            cols="10"
            rows="10"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <input
            type="file"
            placeholder="Enter book name"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button onClick={handleClick}>Update</button>
        </div>
      </div>
    </>
  );
}

export default UpdateBook;
