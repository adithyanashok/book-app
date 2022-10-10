import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import Comment from './Comment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Comments({bookId}) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const {currentUser} = useSelector((state) => state?.user)
  useEffect(() => {
    const fetchComments = async () => { 
      try {
        const bookRes = await axios.get(`https://api-review-app.herokuapp.com/api/comment/find/${bookId}`);
        setComments(bookRes.data)
      } catch (err) {
        console.log(err)
      }
    };
    fetchComments();
  }, [bookId]);
  const handleComment = async () => {
    
    try{
        const res = await axios.post(`https://api-review-app.herokuapp.com/api/comment/`,{bookId, comment})
        setComment(res.data)
        window.location.reload()
    } catch (err) {
        console.log(err)
    }
  }
  return (
    <div className="comments-container">
        <h3>Comments</h3>
        { currentUser ? <div className="text-field">
            <input type="text" placeholder='Enter your comment' onChange={(e) => setComment(e.target.value)} />
            <SendIcon onClick={handleComment} />
        </div> : <div>
          <p>Login To comment</p>
        <Link style={{backgroundColor:'#0f79af', color:"white", padding:'5px', borderRadius:"3px", textDecoration:'none'}} to='/login'>Login</Link>
        </div>}
        {comments.map(comment=>(
        <Comment key={comment._id} comment={comment}/>
      ))}
    </div>
  )
}

export default Comments