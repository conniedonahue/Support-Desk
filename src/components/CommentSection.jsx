import { Form, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { formatDate } from "../../utils/dateUtils";

export default function CommentSection({ ticket, onCommentSubmit }) {
  const [commentText, setCommentText] = useState("");
  const [name, setName] = useState("");
  const [commentList, setCommentList] = useState(ticket.comments || []);
  const sortedComments = [...ticket.comments].sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  useEffect(() => {
    setCommentList(ticket.comments);
  }, [ticket.comments]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const newComment = {
      postedBy: name,
      time: new Date().toISOString(),
      comment: commentText,
    };

    commentList.push(newComment);

    try {
      const res = await axios.patch(`/api/tickets/${ticket.id}`, {
        comments: commentList,
      });
      setCommentList(res.data.comments);
      onCommentSubmit(res.data);
      setCommentText("");
      setName("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="comments-section">
      <Form onSubmit={handleCommentSubmit} className="comment-button-form">
        <textarea
          name="commentText"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="comment-button">
          Leave Comment
        </button>
      </Form>

      {commentList && commentList.length > 0 && (
        <div className="comments-list">
          <h2>Comments</h2>
          {sortedComments.map((c, index) => (
            <div key={index} className="comment">
              <p>
                <strong>{c.postedBy}</strong> ({formatDate(c.time)})
              </p>
              <p>{c.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
