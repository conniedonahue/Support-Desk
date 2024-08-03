import {
  Outlet,
  NavLink,
  useNavigation,
  useLoaderData,
  Form,
  redirect,
} from "react-router-dom";
import "../index.css";
import axios from "axios";

export async function action() {
  const ticket = await axios.post("/api/tickets/", {
    name: "New Ticket",
    email: "",
    description: "",
  });
  return redirect(`/admin/tickets/${ticket.data.id}/edit`);
}

export default function AdminPage() {
  const navigation = useNavigation();
  const tickets = useLoaderData();

  return (
    <>
      <div id="sidebar">
        <h1>Support Tickets</h1>
        <div>
          <Form method="post">
            <button type="submit">New Ticket</button>
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
