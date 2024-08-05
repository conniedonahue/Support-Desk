import axios from "axios";

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
