import express from "express";
import { ticketController } from "../controllers/ticketController.js";

const router = express.Router();
router.use(express.json());

router.get("/tickets", ticketController.getAllTickets, (req, res) => {
  const { tickets } = res.locals;
  res.json(tickets);
});

router.get("/tickets/:id", ticketController.getTicketById, (req, res) => {
  const { ticket } = res.locals;
  res.json(ticket);
});

router.post("/tickets", ticketController.createTicket, (req, res) => {
  const { ticket } = res.locals;
  res.status(201).json(ticket);
});

router.put("/tickets/:id", ticketController.replaceTicket, (req, res) => {
  const { updatedTicket } = res.locals;
  res.status(201).json(updatedTicket);
});

router.patch("/tickets/:id", ticketController.modifyTicket, (req, res) => {
  const { modifiedTicket } = res.locals;
  res.status(201).json(modifiedTicket);
});

router.delete("/tickets/:id", ticketController.deleteTicket, (req, res) => {
  return res.status(200).json({ message: "Ticket deleted successfully" });
});

export default router;
