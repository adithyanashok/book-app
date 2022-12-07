import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
// import axios from "axios";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import { logout } from "../../redux/userSlice";

function Comments({ bookId }) {
  const dispatch = useDispatch()
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state?.user);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const bookRes = await makeRequest.get(`/comment/find/${bookId}`);
        setComments(bookRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [bookId]);
  const handleComment = async () => {
    try {
      const res = await makeRequest.post(`/comment/`, { bookId, comment });
      setComment(res.data);
      window.location.reload();
    } catch (err) {
      if(err.response.status === 401){
        const res = await makeRequest.post('/auth/logout')
        dispatch(logout())
        console.log(res.data)
      }
    }
  };
  return (
    <div className="comments-container">
      <h3>Comments</h3>
      {currentUser ? (
        <div className="text-field">
          <input
            type="text"
            placeholder="Enter your comment"
            onChange={(e) => setComment(e.target.value)}
          />
          <SendIcon onClick={handleComment} />
        </div>
      ) : (
        <div>
          <p>Login To comment</p>
          <Link
            style={{
              backgroundColor: "#0f79af",
              color: "white",
              padding: "5px",
              borderRadius: "3px",
              textDecoration: "none",
            }}
            to="/login"
          >
            Login
          </Link>
        </div>
      )}
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
}

export default Comments;
