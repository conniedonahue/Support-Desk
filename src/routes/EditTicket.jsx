import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import axios from "axios";

export async function action({ request, params }) {
  const ticketId = params.ticketId;
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await axios.put(`/api/tickets/${ticketId}`, updates);
  return redirect(`/admin/tickets/${params.ticketId}`);
}

export default function EditTicket() {
  const ticket = useLoaderData();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`/admin/tickets/${ticket.id}`);
  };

  return (
    <Form method="post" id="edit-ticket-form">
      <p>
        <span>Name</span>
        <input
          placeholder="Name"
          aria-label="Name"
          type="text"
          name="name"
          defaultValue={ticket?.name}
        />
      </p>
      <p>
        <span>Email</span>
        <input
          placeholder="Email"
          aria-label="Email"
          type="text"
          name="email"
          defaultValue={ticket?.email}
        />
      </p>
      <label>
        <span>Status</span>
        <select name="status" defaultValue={ticket?.status}>
          <option value="NEW">NEW</option>
          <option value="IN PROGRESS">IN PROGRESS</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
      </label>

      <label>
        <span>Description</span>
        <textarea
          name="description"
          defaultValue={ticket?.description}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </p>
    </Form>
  );
}
