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
    navigate(`/admin/tickets/${ticket.id}/destroy`);
  };

  return (
    <>
      <h1>Create New Ticket</h1>
      <div className="form-container">
        <Form method="post" id="edit-ticket-form">
          <p>
            <span>Name</span>
            <input
              placeholder="Name"
              aria-label="Name"
              type="text"
              name="name"
              required
            />
          </p>
          <p>
            <span>Email</span>
            <input
              placeholder="Email"
              aria-label="Email"
              type="email"
              name="email"
              required
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
            <textarea name="description" required rows={6} />
          </label>
          <input
            type="hidden"
            id="createdAt"
            name="createdAt"
            value={new Date().toISOString()}
          />
          <div className="button-group">
            <button type="submit">Save</button>
          </div>
        </Form>
        <Form
          id="edit-ticket-form-cancel"
          method="delete"
          className="cancel-button-form"
          action={`/admin/tickets/${ticket.id}/destroy`}
          onSubmit={(event) => {
            if (!confirm("Please confirm you want to delete this ticket.")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="cancel-button">
            Cancel
          </button>
        </Form>
      </div>
    </>
  );
}
