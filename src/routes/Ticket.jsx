import { Form, useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { formatDate } from "../../utils/dateUtils";
import CommentSection from "../components/CommentSection";

export default function Ticket() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [responseSubmitted, setResponseSubmitted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handles Response notification and cleans up URL.
  const handleResponseSubmitted = useCallback(
    (searchParams) => {
      setResponseSubmitted(true);
      setTimeout(() => setResponseSubmitted(false), 3000);
      searchParams.delete("responseSubmitted");
      navigate(
        location.pathname +
          (searchParams.toString() ? `?${searchParams.toString()}` : ""),
        { replace: true }
      );
    },
    [location, navigate]
  );

  useEffect(() => {
    axios.get(`/api/tickets/${ticketId}`).then((res) => setTicket(res.data));

    // This is used for notifications activated by other routes
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("responseSubmitted") === "true") {
      handleResponseSubmitted(searchParams);
    }
  }, [ticketId, navigate, location, handleResponseSubmitted]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const res = await axios.patch(`/api/tickets/${ticketId}`, {
        status: newStatus,
      });
      setTicket(res.data);
      setUpdated(true);
      setTimeout(() => setUpdated(false), 3000);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleCommentSubmit = (updatedTicket) => {
    setTicket(updatedTicket);
  };

  return (
    <div id="ticket">
      <div>
        <h1>{ticket.name ? <>{ticket.name}</> : <i>No Name</i>} </h1>

        {ticket.email && (
          <>
            <p className="bold-label">
              {" "}
              Email:{" "}
              <a target="_blank" href={`mailto:${ticket.email}`}>
                {ticket.email}
              </a>
            </p>
          </>
        )}
        <label>
          <div>
            <span className="bold-label">Created: </span>
            <span>{formatDate(ticket.createdAt)}</span>
          </div>
        </label>

        <label>
          <span className="bold-label">Status: </span>
          <select
            name="status"
            value={ticket.status}
            onChange={handleStatusChange}
            className="status-select"
          >
            <option className="answered-field" value="NEW">
              NEW
            </option>
            <option className="answered-field" value="IN PROGRESS">
              IN PROGRESS
            </option>
            <option className="answered-field" value="RESOLVED">
              RESOLVED
            </option>
          </select>
        </label>

        <div className="notification-container">
          {updated && <p>Status updated!</p>}
          {responseSubmitted && <p>Response sent!</p>}
        </div>

        {ticket.description && (
          <>
            <p className="bold-label">Description: </p>
            <p className="answered-field">{ticket.description}</p>
          </>
        )}

        <div className="button-group">
          <Form action="edit">
            <button type="submit" className="edit-button">
              Edit
            </button>
          </Form>
          <Form action="respond">
            <button type="submit" className="respond-button">
              Respond
            </button>
          </Form>
          <Form
            method="delete"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this ticket.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="delete-button">
              Delete
            </button>
          </Form>
        </div>
      </div>
      <hr className="hr-divider" />
      <CommentSection
        ticket={ticket}
        onCommentSubmit={handleCommentSubmit}
      />
      {/* <Form
        id="edit-ticket-form-comment"
        method="post"
        className="comment-button-form"
        action={`/admin/tickets/${ticket.id}/comment`}
      >
        <textarea name="comment" placeholder="Write a comment..." required />
        <input type="text" name="name" placeholder="Your name" required />
        <input type="hidden" />
        <button type="submit" className="comment-button">
          Leave Comment
        </button>
      </Form>

      {ticket.comments && ticket.comments.length > 0 && (
        <div className="comments-section">
          <h2>Comments</h2>
          {ticket.comments.map((c, index) => (
            <div key={index} className="comment">
              <p>
                <strong>{c.postedBy}</strong> ({formatDate(c.time)})
              </p>
              <p>{c.comment}</p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}
