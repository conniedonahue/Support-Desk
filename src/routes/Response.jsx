import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";

export async function action({ request, params }) {
  const formData = await request.formData();
  const { response, email } = Object.fromEntries(formData);
  console.log(`Sent the following response to ${email}: ${response}`);
  return redirect(`/admin/tickets/${params.ticketId}`);
}

export default function Response() {
  const ticket = useLoaderData();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`/admin/tickets/${ticket.id}`);
  };

  return (
    <Form method="post" id="response-form">
      <h1>{ticket.name} </h1>
      <p>
        <span>Email Body</span>
        <textarea
          placeholder="Write your response here"
          aria-label="Write your response here"
          type="text"
          name="response"
          rows={6}
        />
      </p>
      <p>
        <input type="hidden" name="email" value={ticket.email} />
      </p>
      <p>
        <button type="submit">Send</button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </p>
    </Form>
  );
}
