import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchTickets } from "../services/api";
import Spinner from "../ui/Spinner";
import { setLoading } from "../store/ticketsSlice";
import InvalidTicket from "./InvalidTicket";

function TicketDetails() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const dispatch = useDispatch();
  const { tickets, loading } = useSelector((state) => state.tickets);

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    if (tickets.length === 0) {
      dispatch(setLoading(true));
      dispatch(fetchTickets());
    }
  }, [tickets, dispatch]);

  useEffect(
    function () {
      if (tickets.length > 0) {
        const ticketfound = tickets.find(
          (ticket) => String(ticket.id) === String(id)
        );
        setTicket(ticketfound);
      }
    },
    [tickets, id]
  );

  if (!ticket) return <InvalidTicket />;

  if (loading) return <Spinner />;

  return (
    <form style={{ padding: "20px" }}>
      <h2>Ticket details</h2>
      <p>
        <strong>ID:</strong> {ticket.id}
      </p>
      <p>
        <strong>Title:</strong> {ticket.title}
      </p>
      <p>
        <strong>Status:</strong> {ticket.status}
      </p>
      <p>
        <strong>Priority:</strong> {ticket.priority}
      </p>
      <p>
        <strong>Assignee:</strong> {ticket.assignee}
      </p>
      <p>
        <strong>Reporter:</strong> {ticket.reporter}
      </p>
      <p>
        <strong>Category:</strong> {ticket.category}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(ticket.created_at).toLocaleString()}
      </p>
    </form>
  );
}

export default TicketDetails;
