let cache = {};
let writeTimeout = null;
const WRITE_DELAY = 1000;

const writeData = (newData) => {
  if (writeTimeout) {
    clearTimeout(writeTimeout);
  }
  writeTimeout = setTimeout(() => {
    try {
      writeData(newData);
    } catch (err) {
      console.error("Error writing data:", err);
    }
  }, WRITE_DELAY);
};

const clearCache = () => {
  cache = {};
};

const getTickets = () => {
  return Object.values(cache);
};

const getTicket = (ticketId) => {
  return cache[ticketId];
};

const addTicket = (ticket) => {
  cache[ticket.id] = ticket;
  writeData(ticket);
};

const updateTicket = (ticketId, newInfo) => {
  if (cache[ticketId]) {
    cache[ticketId] = { ...cache[ticketId], ...newInfo };
    writeData(newInfo);
  }
  return cache[ticketId];
};

const deleteTicket = (ticketId) => {
  if (cache[ticketId]) delete cache[ticketId];
};

export {
  getTickets,
  getTicket,
  addTicket,
  updateTicket,
  clearCache,
  deleteTicket,
};
