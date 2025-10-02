import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchTicketById } from "../services/api";
import Spinner from "../ui/Spinner";
import InvalidTicket from "./InvalidTicket";
import { setTicketItem } from "../store/ticketsSlice";

function TicketDetails() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentTicket, currentTicketLoading } = useSelector(
    (state) => state.tickets
  );

  useEffect(() => {
    return function () {
      dispatch(setTicketItem(null));
    };
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchTicketById(id));
    }
  }, [dispatch, id]);

  if (!id) return <InvalidTicket />;

  if (currentTicketLoading) return <Spinner />;

  if (!currentTicket) return <InvalidTicket />;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ticket details</h2>
      <p>
        <strong>ID:</strong> {currentTicket.id}
      </p>
      <p>
        <strong>Title:</strong> {currentTicket.title}
      </p>
      <p>
        <strong>Status:</strong> {currentTicket.status}
      </p>
      <p>
        <strong>Priority:</strong> {currentTicket.priority}
      </p>
      <p>
        <strong>Assignee:</strong> {currentTicket.assignee}
      </p>
      <p>
        <strong>Reporter:</strong> {currentTicket.reporter}
      </p>
      <p>
        <strong>Category:</strong> {currentTicket.category}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(currentTicket.created_at).toLocaleString()}
      </p>
      <button onClick={() => navigate("/")}>🔙Home</button>
    </div>
  );
}

export default TicketDetails;
