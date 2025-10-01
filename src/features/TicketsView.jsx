import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTickets } from "../services/api";
import { setLoading } from "../store/ticketsSlice";
import Spinner from "../ui/Spinner";

function TicketsView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tickets, loading } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(fetchTickets());
  }, [dispatch]);

  return (
    <>
      <div>
        <h2>Tickets</h2>

        {loading ? (
          <Spinner />
        ) : tickets.length > 0 ? (
          <table border="1" cellPadding="10" cellSpacing="0" width="100%">
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  onDoubleClick={() => navigate(`/ticket?id=${ticket.id}`)}
                  style={{ cursor: "default" }}
                >
                  <td>{ticket.id}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.assignee}</td>
                  <td>{ticket.reporter}</td>
                  <td>{ticket.category}</td>
                  <td>{new Date(ticket.created_at).toLocaleString()}</td>

                  <td onDoubleClick={(e) => e.stopPropagation()}>
                    <button style={{ cursor: "pointer" }}>Edit</button>
                    <button style={{ cursor: "pointer" }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No tickets found
          </p>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/create")}>Create Ticket</button>
      </div>
    </>
  );
}

export default TicketsView;
