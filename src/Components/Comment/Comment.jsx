import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../Pages/Book/Book.css'
import { format } from 'timeago.js'
function Comment({comment}) {
    const [user, setUser] = useState({})

    useEffect(() => {
      const fetchComment = async () => {
        try{
            const userRes = await axios.get(`http://localhost:5000/api/user/find/${comment.userId}`)
            setUser(userRes.data)
        } catch (err) {
            console.log(err)
        }
      }
      fetchComment()
    }, [comment.userId])
    
  return (
    <div className="comments">
        <div className="comment">
            <h5>{user.name}</h5>
            <p className='timeago' >{format(comment.createdAt)}</p>
        </div>      
            <p>{comment.comment}</p><hr/>
    </div>
  )
}

export default Comment