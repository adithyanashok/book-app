import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../Pages/Book/Book.css'
import {format} from 'timeago.js'

function Comment({comment}) {
    const [user, setUser] = useState({})
    
    useEffect(() => {
      const fetchComment = async () => {
        try{
            const userRes = await axios.get(`https://api-review-app.herokuapp.com/api/user/find/${comment.userId}`)
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
            <h5>{user?.name}</h5>
            <p>{format(comment?.createdAt)}</p>
            
        </div>      
            <p>{comment?.comment}</p><hr/>
    </div>
  )
}

export default Comment