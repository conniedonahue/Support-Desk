import { Form, useLoaderData, redirect } from "react-router-dom";
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
  console.log("editor, ", ticket);

  return (
    <Form method="post" id="contact-form">
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
        <input type="radio" id="new" name="new" value="new" />
        <label htmlFor="newStatus"> New </label> <br />
        <input
          type="radio"
          id="in-progress"
          name="in-progress"
          value="in-progress"
        />
        <label htmlFor="inProgressStatus"> In progress </label>
        <br />
        <input type="radio" id="resolved" name="resolved" value="resolved" />
        <label htmlFor="resolvedStatus"> Resolved </label>
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
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
