import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import Comment from './Comment';
import { useDispatch } from 'react-redux';
import { commentFailure, commentStart, commentSuccess, fetchCommentFailure, fetchCommentStart, fetchCommentSuccess } from '../../redux/commentSlice';

function Comments({bookId}) {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    
  useEffect(() => {
    const fetchComments = async () => { 
        dispatch(fetchCommentStart())
      try {
        const bookRes = await axios.get(`https://api-review-app.herokuapp.com/api/comment/find/${bookId}`);
        dispatch(fetchCommentSuccess(bookRes.data))
      } catch (err) {
        dispatch(fetchCommentFailure(err))
      }
    };
    fetchComments();
  }, [bookId, dispatch]);
  const handleComment = async () => {
    dispatch(commentStart())
    try{
        const res = await axios.post(`https://api-review-app.herokuapp.com/api/comment/`,{bookId, comment})
        dispatch(commentSuccess(res.data))

    } catch (err) {
        dispatch(commentFailure(err))
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