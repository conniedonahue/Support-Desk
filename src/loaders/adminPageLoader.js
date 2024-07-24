import axios from "axios";
import { redirect } from "react-router-dom";

export async function loader() {
  try {
    const tickets = await axios.get(`/api/tickets/`);
    console.log("tickets", tickets.data);
    return tickets.data;
  } catch (error) {
    console.error("Error loading tickets:", error);
    return redirect("/admin");
  }
}
