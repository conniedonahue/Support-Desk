import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MainPage = () => {
  const [form, setForm] = useState({ name: "", email: "", description: "" });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/tickets", form);
      console.log("Ticket submitted:", res.data);
      setForm({ name: "", email: "", description: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      navigate("/");
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

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <p>Ticket submitted! Support will reach out to you soon!</p>
      )}
    </div>
  );
};

export default MainPage;
