import { Form, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Ticket() {
  //   const ticket = {
  //     name: "name",
  //     email: "email",
  //     description: "description",
  //   };

  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    axios.get(`/api/tickets/${ticketId}`).then((res) => setTicket(res.data));
  }, [ticketId]);

  console.log("ticket", ticket);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div id="ticket">
      <div>
        <h1>{ticket.name ? <>{ticket.name}</> : <i>No Name</i>} </h1>

        {ticket.email && (
          <p>
            <a target="_blank" href={`mailto:${ticket.email}`}>
              {ticket.email}
            </a>
          </p>
        )}

        {ticket.description && <p>{ticket.description}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this ticket.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
