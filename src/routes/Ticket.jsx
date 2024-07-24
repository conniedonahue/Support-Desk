import { Form, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Ticket() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    axios.get(`/api/tickets/${ticketId}`).then((res) => setTicket(res.data));
  }, [ticketId]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

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
        {ticket.status && (
          <p className="bold-label">
            Status: <span className="answered-field"> {ticket.status} </span>
          </p>
        )}

        <br></br>

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
    </div>
  );
}
