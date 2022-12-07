// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { makeRequest } from '../axios'
import '../Components/Books/Books.css'
import NavBar from '../Components/NavBar/NavBar'
function Search() {
    const [books, setBooks] = useState([])
    const query = useLocation().search
    const PF = 'http://localhost:5000/images/'
    useEffect(() => {
      const fetchVideos = async () => {
        try{
            const res = await makeRequest.get(`/books/search/${query}`)
            setBooks(res.data)
        }catch(err){
            console.log(err)
        }
      }
      fetchVideos()
    }, [query])
    
  return (
    <>
    <NavBar/>
    <div className='books-section' >
        <div className="books-wrapper">
          {
            books.map((book) => (
              <a key={book._id} href={`/book/${book._id}`} ><img className='book-card' src={PF+book.bookImg} alt={book.bookTitle} /></a>
            ))
          }
        </div>
    </div>
    </>
  )
}

export default Search