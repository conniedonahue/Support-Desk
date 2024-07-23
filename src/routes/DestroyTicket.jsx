import { redirect } from "react-router-dom";
import axios from "axios";

export async function action({ params }) {
  const ticketId = params.ticketId;

  try {
    await axios.delete(`/api/tickets/${ticketId}`);
    console.log("post axios");
    return redirect("/admin");
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return redirect("/admin");
  }
}
