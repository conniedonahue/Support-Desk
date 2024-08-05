import axios from "axios";

export async function loader({ params }) {
  try {
    const res = await axios.get(`/api/tickets/${params.ticketId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching ticket:", error);
  }
}

export async function updateTicketStatus(ticketId, newStatus) {
  try {
    const res = await axios.patch(`/api/tickets/${ticketId}`, {
      status: newStatus,
    });
    return res.data;
  } catch (error) {
    console.error("Error updating status:", error);
  }
}
