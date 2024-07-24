import {
  Outlet,
  NavLink,
  useNavigation,
  useLoaderData,
  Form,
  redirect,
} from "react-router-dom";
import "../index.css";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export async function loader() {
//   try {
//     const tickets = await axios.get(`/api/tickets/`);
//     console.log("tickets", tickets.data);
//     return tickets.data;
//   } catch (error) {
//     console.error("Error loading tickets:", error);
//     return redirect("/admin");
//   }
// }

export default function AdminPage() {
  // const [tickets, setTickets] = useState([]);
  const navigation = useNavigation();
  const tickets = useLoaderData();

  // useEffect(() => {
  //   axios.get("/api/tickets").then((res) => setTickets(res.data));
  // }, []);

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
          {tickets.length !== 0 ? (
            <ul>
              {tickets.map((ticket) => (
                <li key={ticket.id}>
                  <NavLink
                    to={`tickets/${ticket.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {ticket.name ? <>{ticket.name}</> : <i>No Name</i>}{" "}
                  </NavLink>
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
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
