import {
  Form,
  useParams,
  useLocation,
  useNavigate,
  useLoaderData,
  useRevalidator,
} from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { formatDate } from "../../utils/dateUtils";
import CommentSection from "../components/CommentSection";
import { updateTicketStatus } from "../loaders/ticketLoader";

export default function Ticket() {
  const ticket = useLoaderData();
  const revalidator = useRevalidator();
  const { ticketId } = useParams();
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
    // This is used for notifications activated by other routes
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("responseSubmitted") === "true") {
      handleResponseSubmitted(searchParams);
    }
  }, [location, handleResponseSubmitted]);

  if (revalidator.state === "loading") {
    return <div>Loading...</div>;
  }

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await updateTicketStatus(ticketId, newStatus);
      setUpdated(true);
      setTimeout(() => setUpdated(false), 3000);
      revalidator.revalidate();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleCommentSubmit = () => {
    revalidator.revalidate();
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
      <CommentSection ticket={ticket} onCommentSubmit={handleCommentSubmit} />
    </div>
  );
}
