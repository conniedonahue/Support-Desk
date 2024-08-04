import {
  getTickets,
  getTicket,
  addTicket,
  updateTicket,
  deleteTicket,
} from "../db/fakeDatabase.js";

export const ticketController = {};

ticketController.getAllTickets = (req, res, next) => {
  try {
    const tickets = getTickets();
    res.locals.tickets = tickets;
    return next();
  } catch (err) {
    return next({
      log: "Error occured in ticketController.getAllTickets middleware.",
      status: 500,
      message: "An error occured fetching the tickets from the database.",
    });
  }
};

ticketController.getTicketById = (req, res, next) => {
  try {
    const ticketId = parseInt(req.params.id);
    const ticket = getTicket(ticketId);
    if (!ticket) {
      return next({
        log: "Error occured in ticketController.getOneTicket middleware.",
        status: 404,
        message: "Ticket not found.",
      });
    }
    res.locals.ticket = ticket;
    return next();
  } catch (err) {
    return next({
      log: "Error occured in ticketController.getAllTickets middleware.",
      status: 500,
      message: "An error occured fetching the ticket from the database.",
    });
  }
};

// Using simple counter as key for hashmap fakeDatabase.
let id = 1;

ticketController.createTicket = (req, res, next) => {
  try {
    const ticket = { id: id++, ...req.body, status: "NEW", comments: [] };
    addTicket(ticket);
    console.log(`Ticket added to fake database: ${JSON.stringify(ticket)}`);
    res.locals.ticket = ticket;
    return next();
  } catch (err) {
    return next({
      log: "Error occured in ticketController.createTicket middleware.",
      status: 500,
      message: "An error occured while creating a new ticket the database.",
    });
  }
};

ticketController.replaceTicket = (req, res, next) => {
  try {
    const ticketId = parseInt(req.params.id);
    const ticket = getTicket(ticketId);
    if (!ticket) {
      return next({
        log: "Error occured in ticketController.replaceTicket middleware.",
        status: 404,
        message: "Ticket not found.",
      });
    }
    const newInfo = {
      name: req.body.name,
      email: req.body.email,
      status: req.body.status,
      description: req.body.description,
      createdAt: req.body.createdAt,
      comments: req.body.comments,
    };
    const updatedTicket = updateTicket(ticketId, newInfo);
    res.locals.updatedTicket = updatedTicket;
    return next();
  } catch (err) {
    return next({
      log: "Error occured in ticketController.replaceTicket middleware.",
      status: 500,
      message: "An error occured while replacing ticket in the database.",
    });
  }
};

ticketController.modifyTicket = (req, res, next) => {
  try {
    const ticketId = parseInt(req.params.id);
    const ticket = getTicket(ticketId);
    if (!ticket) {
      return next({
        log: "Error occured in ticketController.modifyTicket middleware.",
        status: 404,
        message: "Ticket not found.",
      });
    }
    const modifiedTicket = updateTicket(ticketId, req.body);
    res.locals.modifiedTicket = modifiedTicket;
    return next();
  } catch (err) {
    return next({
      log: "Error occured in ticketController.modifyTicket middleware.",
      status: 500,
      message: "An error occured while modifying ticket in the database.",
    });
  }
};

ticketController.deleteTicket = (req, res, next) => {
  try {
    const ticketId = parseInt(req.params.id);
    const ticket = getTicket(ticketId);
    if (!ticket) {
      return next({
        log: "Error occured in ticketController.modifyTicket middleware.",
        status: 404,
        message: "Ticket not found.",
      });
    }
    deleteTicket(ticketId);
    console.log(`Ticket deleted successfully`);
    return next();
  } catch (err) {
    return next({
      log: "Error occured in ticketController.deleteTicket middleware.",
      status: 500,
      message: "An error occured while deleting ticket in the database.",
    });
  }
};
