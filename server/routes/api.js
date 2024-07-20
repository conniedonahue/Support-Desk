import express from "express";

const router = express.Router();
router.use(express.json());

const tickets = [];
let id = 1;

router.post("/tickets", (req, res) => {
  const ticket = { id: id++, ...req.body, status: "new", response: "" };
  tickets.push(ticket);
  console.log(
    `Would normally send email here with body: ${JSON.stringify(ticket)}`
  );
  res.status(201).json(ticket);
});

router.get("/tickets", (req, res) => {
  res.json(tickets);
});

router.get("/tickets/:id", (req, res) => {
  const ticket = tickets.find((t) => t.id === parseInt(req.params.id));
  if (!ticket) return res.status(404).send("Ticket not found");
  res.json(ticket);
});

router.put("/tickets/:id", (req, res) => {
  const ticket = tickets.find((t) => t.id === parseInt(req.params.id));
  if (!ticket) return res.status(404).send("Ticket not found");
  ticket.status = req.body.status;
  ticket.response = req.body.response;
  res.json(ticket);
});

export default router;
