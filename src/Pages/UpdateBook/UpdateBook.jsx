import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../../Components/NavBar/NavBar'
import './UpdateBook.css'
function UpdateBook() {
  const [bookTitle, setBookName] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [rating, setRating] = useState(0)
  const [bookLink, setAffilateLink] = useState('')
  const [contentName, setContentName] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)
  const { currentBook } = useSelector((state) => state.book);
   const handleClick = async (e) => {
    e.preventDefault()
    const newBook = {
      bookTitle,
      authorName,
      rating,
      bookLink,
      contentName,
      content
      
    }
    if(file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newBook.bookImg = filename;
      try{
        await axios.put('https://api-review-app.herokuapp.com/api/upload', data)
      }catch(err){}
    }
    try{
      const res = await axios.put(`https://api-review-app.herokuapp.com/api/books/${currentBook._id}`, newBook)
      console.log(res.data)
      window.location.replace('https://celebrated-tiramisu-fcf1d7.netlify.app/book/' + res.data._id)
    }catch(err) {}

   }

  return (
    <>
    <NavBar/>
    <div className='update-books' >
        <div className="update-book">
            <h1>Update a book</h1>
            <input type="text" placeholder={currentBook?.bookTitle} onChange={(e) => setBookName(e.target.value)} />
            <input type="text" placeholder={currentBook?.authorName} onChange={(e) => setAuthorName(e.target.value)} />
            <label for="rating">Rating:</label>
            <select onChange={(e) => setRating(e.target.value)} name="rating">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select> 
            <input type="text" placeholder={currentBook?.bookLink} onChange={(e) => setAffilateLink(e.target.value)} />
            <input type="text" placeholder={currentBook?.contentName} onChange={(e) => setContentName(e.target.value)} />
            <textarea name="content" placeholder={currentBook?.content} cols="10" rows="10" onChange={(e) => setContent(e.target.value)} ></textarea>
            <input type="file" placeholder='Enter book name' id='fileInput' onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleClick} >Update</button>
        </div>
    </div>
    </>
  )
}

export default UpdateBook