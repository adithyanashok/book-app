import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer' >
        <div className="footer-items">
            <div className="footer-logo">
                <h2>The Library</h2>
            </div>
            <div className="footer-links">
                <p>Privacy Policy</p>
                <p>Feedback</p>
            </div>
            <div className="footer-text">
                <p>© 2022, TheLibrary.com</p>
            </div>
        </div>
    </div>
  )
}

export default Footer