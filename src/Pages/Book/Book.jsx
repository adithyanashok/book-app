import React from 'react'
import './Book.css'
import Rating from '@mui/material/Rating';
import SendIcon from '@mui/icons-material/Send';
import NavBar from '../../Components/NavBar/NavBar';
const Book = () => {
    const value = 4;
  return (
    <>
    <NavBar/>
    <div className='book-page' >
        <div className="cover-img">
            <img src="https://images-na.ssl-images-amazon.com/images/I/718wzK6mymL.jpg" alt="" />
        </div>
        <div className="contents">
            <h1 className="book-title">Think and grow rich</h1>
            <p className='book-author' >by Napolean Hill (Author)</p>
            <div className="actions">
                <h3>Adam Jhon</h3>
                <button>Buy Now</button>
            </div>
                <div className="rating">
                    <Rating name="read-only" value={value} readOnly />
                </div>
            <h1 className="text-head">Summary</h1>
            <p className='text' >To put it in simple terms, you can become anything that your mind deems possible; as a result, your mind becomes the one thing that can either stop you or propel you toward becoming the best version of yourself.</p>
            <div className="comments">
                <h3>Comments</h3>
                <div className="text-field">
                    <input type="text" placeholder='Enter your comment' />
                    <SendIcon/>
                </div>
                <div className="comment">
                    <h5>Adithyan</h5>
                    <p>Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</p><hr/>
                </div>
                <div className="comment">
                    <h5>Adithyan</h5>
                    <p>Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</p><hr/>
                </div>
                <div className="comment">
                    <h5>Adithyan</h5>
                    <p>Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</p><hr/>
                </div>
                <div className="comment">
                    <h5>Adithyan</h5>
                    <p>Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</p><hr/>
                </div>
                <div className="comment">
                    <h5>Adithyan</h5>
                    <p>Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</p><hr/>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Book