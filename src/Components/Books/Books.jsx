import React, { useEffect, useState } from 'react'
import './Books.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Books = () => {
  const [books, setBooks] = useState([])
  const PF = 'https://api-review-app.herokuapp.com/images/'
  useEffect(() => {
    const fetchBooks = async () => {
      try{
        const res = await axios.get('https://api-review-app.herokuapp.com/api/books') 
        console.log(res.data)
        setBooks(res.data)
      }catch (err){
        console.log(err)
      }
    }
    fetchBooks()
  }, [])
  
  return (
    <div className='books-section' >
        <div className="books-wrapper">
          {
            books.map((book)=>(
              <Link key={book._id} to={`/book/${book._id}`} ><img className='book-card' src={PF+book.bookImg} alt="" /></Link>

            ))
          }
        </div>
    </div>
  )
}

export default Books