import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../Components/Books/Books.css'
import NavBar from '../Components/NavBar/NavBar'
function Search() {
    const [books, setBooks] = useState([])
    const query = useLocation().search
    const PF = 'https://api-review-app.herokuapp.com/images/'
    useEffect(() => {
      const fetchVideos = async () => {
        try{
            const res = await axios.get(`https://api-review-app.herokuapp.com/api/books/search/${query}`)
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
              <Link key={book._id} to={`/book/${book._id}`} ><img className='book-card' src={PF+book.bookImg} alt="" /></Link>
            ))
          }
        </div>
    </div>
    </>
  )
}

export default Search