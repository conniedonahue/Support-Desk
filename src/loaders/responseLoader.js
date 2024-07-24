import axios from "axios";
import { redirect } from "react-router-dom";

export async function loader({ params }) {
  try {
    const ticket = await axios.get(`/api/tickets/${params.ticketId}`);
    return ticket.data;
  } catch (error) {
    console.error("Error loading tickets:", error);
    return redirect("/admin");
  }
}
