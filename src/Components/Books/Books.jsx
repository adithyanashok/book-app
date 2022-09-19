import React from 'react'
import './Books.css'
import { Link } from 'react-router-dom'
const Books = () => {
  return (
    <div className='books-section' >
        <div className="books-wrapper">
            <Link to='/book/thinkandgrowrich' ><img className='book-card' src="https://images-na.ssl-images-amazon.com/images/I/718wzK6mymL.jpg" alt="" /></Link>
        </div>
    </div>
  )
}

export default Books