import axios from "axios";

export const submitTicket = async (ticketData) => {
  const currentDatetime = new Date().toISOString();
  const response = await axios.post("/api/tickets", {
    ...ticketData,
    createdAt: currentDatetime,
  });
  return response.data;
};