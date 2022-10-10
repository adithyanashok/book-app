import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../../Components/NavBar/NavBar'
import './AddBooks.css'
function AddBooks() {
  const [bookTitle, setBookName] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [rating, setRating] = useState(0)
  const [bookLink, setAffilateLink] = useState('')
  const [contentName, setContentName] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)
  const { loading } = useSelector((state) => state?.book);

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
        await axios.post('https://api-review-app.herokuapp.com/api/upload', data)
      }catch(err){}
    }
    try{
      const res = await axios.post('https://api-review-app.herokuapp.com/api/books', newBook)
      console.log(res.data)
      window.location.replace('https://book-app-ten-orpin.vercel.app/book/' + res.data._id)
    }catch(err) {}

   }

  return (
    <>
    <NavBar/>
    <div className='add-books' >
        <div className="add-book">
            {loading ? <h1>Posting book...</h1> : <h1>Post a book</h1> }
            <input type="text" placeholder='Enter book name' onChange={(e) => setBookName(e.target.value)} />
            <input type="text" placeholder='Enter author name' onChange={(e) => setAuthorName(e.target.value)} />
            <label for="rating">Rating:</label>
            <select onChange={(e) => setRating(e.target.value)} name="rating">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select> 
            <input type="text" placeholder='Enter Affilate link' onChange={(e) => setAffilateLink(e.target.value)} />
            <input type="text" placeholder='Enter content name' onChange={(e) => setContentName(e.target.value)} />
            <textarea placeholder='Enter Text...' name="content" cols="10" rows="10" onChange={(e) => setContent(e.target.value)} ></textarea>
            <input type="file" placeholder='Enter book name' id='fileInput' onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleClick} >Post</button>
        </div>
    </div>
    </>
  )
}

export default AddBooks