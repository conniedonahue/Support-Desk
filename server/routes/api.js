import express from "express";
import {
  getTickets,
  getTicket,
  addTicket,
  updateTicket,
  deleteTicket,
} from "../db/fakeDatabase.js";

const router = express.Router();
router.use(express.json());

let id = 1;

router.post("/tickets", (req, res) => {
  const ticket = { id: id++, ...req.body, status: "new", response: "" };
  addTicket(ticket);
  console.log(
    `Would normally send email here with body: ${JSON.stringify(ticket)}`
  );
  res.status(201).json(ticket);
});

router.get("/tickets", (req, res) => {
  const tickets = getTickets();
  res.json(tickets);
});

router.get("/tickets/:id", (req, res) => {
  const ticketId = parseInt(req.params.id);
  if (!ticketId) return res.status(404).send("Ticket not found");
  const ticket = getTicket(ticketId);
  res.json(ticket);
});

router.put("/tickets/:id", (req, res) => {
  const ticketId = parseInt(req.params.id);
  const tickets = getTickets();
  const ticket = tickets[ticketId];
  if (!ticket) return res.status(404).send("Ticket not found");
  const updatedTicket = {
    status: req.body.status,
    response: req.body.response,
  };
  updateTicket(ticketId, updatedTicket);
  res.json({ ...ticket, ...updatedTicket });
});

router.delete("/tickets/:id", (req, res) => {
  const ticketId = parseInt(req.params.id);
  const tickets = getTickets();
  if (!tickets[ticketId]) return res.status(404).send("Ticket not found");
  deleteTicket(ticketId);
  return res.status(200);
});

export default router;
