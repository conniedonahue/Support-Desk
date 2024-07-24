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
  const ticket = { id: id++, ...req.body, status: "NEW" };
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
  const ticket = getTicket(ticketId);
  if (!ticket) return res.status(404).send("Ticket not found");
  const newInfo = {
    name: req.body.name,
    email: req.body.email,
    status: req.body.status,
    description: req.body.description,
  };
  const updatedTicket = updateTicket(ticketId, newInfo);
  res.json(updatedTicket);
});

router.delete("/tickets/:id", (req, res) => {
  const ticketId = parseInt(req.params.id);
  const ticket = getTicket(ticketId);
  console.log("ticket:", ticket);
  if (!ticket) return res.status(404).send("Ticket not found");
  deleteTicket(ticketId);
  console.log(getTickets());
  return res.status(200).json({ message: "Ticket deleted successfully" });
});

export default router;
