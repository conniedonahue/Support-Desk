import axios from "axios";

export async function loader({ params }) {
  try {
    const res = await axios.get(`/api/tickets/${params.ticketId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching ticket:", error);
  }
}
