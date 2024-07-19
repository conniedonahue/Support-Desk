import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  //   const { contacts } = useLoaderData();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get("/api/tickets").then((res) => setTickets(res.data));
  }, []);

  return (
    <>
      <div id="sidebar">
        <h1>Support Tickets</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search tickets"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {tickets.length ? (
            <ul>
              {tickets.map((ticket) => (
                <li key={ticket.id}>
                  <Link to={`tickets/${ticket.id}`}>
                    {ticket.name ? <>{ticket.name}</> : <i>No Name</i>}{" "}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No tickets</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
