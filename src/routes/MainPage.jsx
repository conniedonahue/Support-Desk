import { useState } from "react";
import axios from "axios";

const MainPage = () => {
  const [form, setForm] = useState({ name: "", email: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/tickets", form).then((res) => {
      console.log("Ticket submitted:", res.data);
    });
  };

  return (
    <div>
      <h1>Submit a Ticket</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          required
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MainPage;
