import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import Comment from './Comment';

function Comments({bookId}) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    
  useEffect(() => {
    const fetchComments = async () => { 
      try {
        const bookRes = await axios.get(`https://api-review-app.herokuapp.com/api/comment/find/${bookId}`);
        setComments(bookRes.data);
        console.log(bookRes.data)
      } catch (err) {
        console.log(err)
      }
    };
    fetchComments();
  }, [bookId]);
  const handleComment = async () => {
    try{
        const res = await axios.post(`http://localhost:5000/api/comment/`,{bookId, comment})
        console.log(res.data)
        setComment(res.data)
        window.location.reload()

    } catch (err) {
        console.log(err)
    }
  }
  return (
    <div className="comments-container">
        <h3>Comments</h3>
        <div className="text-field">
            <input type="text" placeholder='Enter your comment' onChange={(e) => setComment(e.target.value)} />
            <SendIcon onClick={handleComment} />
        </div>
        {comments.map(comment=>(
        <Comment key={comment._id} comment={comment}/>
      ))}
    </div>
  )
}

export default Comments