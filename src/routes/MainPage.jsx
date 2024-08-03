import { useState } from "react";
import axios from "axios";

const MainPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
    createdAt: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDatetime = new Date().toISOString();
      const res = await axios.post("/api/tickets", {
        ...form,
        createdAt: currentDatetime,
      });
      console.log("Ticket submitted:", res.data);
      setForm({ name: "", email: "", description: "", createdAt: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="MainPage-root" className="mainPage-container">
      <h1>Submit a Ticket</h1>
      <form onSubmit={handleSubmit} className="ticket-submit-form">
        <label>
          <span>Name: </span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            required
          />
        </label>

        <label>
          <span> Email: </span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            required
          />
        </label>

        <label>
          <span>Description: </span>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            required
          />
        </label>

        <input type="hidden" id="createdAt" value={form.createdAt} />

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <p>Ticket submitted! Support will reach out to you soon!</p>
      )}
    </div>
  );
};

export default MainPage;
