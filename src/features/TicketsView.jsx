import { useNavigate } from "react-router-dom";
import CreateTicket from "./CreateTicket";

const tickets = [
  {
    id: "f7680130-53b3-4411-b874-324238df8d8f",
    title: "Login Issue",
    description: "User unable to log in after resetting password.",
    status: "open",
    priority: "high",
    assignee: "john.doe@example.com",
    reporter: "alice@example.com",
    category: "bug",
    created_at: "2025-09-30T17:19:17.546759",
    updated_at: "2025-09-30T17:19:17.546759",
  },
  {
    id: "11a227fe-7ad9-4e7b-9e67-79f0aadf9425",
    title: "Add Dark Mode",
    description:
      "Several users requested a dark mode feature for better usability at night.",
    status: "in_progress",
    priority: "medium",
    assignee: "dev.team@example.com",
    reporter: "pm@example.com",
    category: "feature",
    created_at: "2025-09-30T17:19:17.546759",
    updated_at: "2025-09-30T17:19:17.546759",
  },
  {
    id: "d6ff23d6-3b01-49b1-91dc-3bdd64ff0761",
    title: "Billing Error",
    description: "Incorrect total shown on invoice for multiple purchases.",
    status: "open",
    priority: "urgent",
    assignee: "support.agent@example.com",
    reporter: "customer@example.com",
    category: "support",
    created_at: "2025-09-30T17:19:17.546759",
    updated_at: "2025-09-30T17:19:17.546759",
  },
];

function TicketsView() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h2>Tickets</h2>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assignee</th>
              <th>Reporter</th>
              <th>Category</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.assignee}</td>
                  <td>{ticket.reporter}</td>
                  <td>{ticket.category}</td>
                  <td>{new Date(ticket.created_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" align="center">
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <button
          onClick={() => {
            navigate("/create");
          }}
        >
          Create Ticket
        </button>
      </div>
    </>
  );
}

export default TicketsView;
