import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteTicket, fetchTickets } from "../services/api";
import { setLoading } from "../store/ticketsSlice";
import Spinner from "../ui/Spinner";
import CreateTicketPopUp from "./CreateTicket";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import {
  getAssigneeLabel,
  getCategoryLabel,
  getPriorityLabel,
  getStatusLabel,
} from "../utils/utils";

function TicketsView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const [toBeDeleted, setToBeDeleted] = useState(null);
  const [confirmedDeleteId, setConfirmedDeleteId] = useState(null);

  const { tickets, loading } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(fetchTickets());
  }, [dispatch]);

  function handleDeleteButton(ticket) {
    setIsOpen(true);
    setConfirmedDeleteId(ticket.id);
    setToBeDeleted(ticket);
  }

  function handleConfirmDelete() {
    dispatch(deleteTicket(confirmedDeleteId));
    setIsOpen(false);
  }

  function handleOnCancel() {
    setIsOpen(false);
  }

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
                  <td>{getStatusLabel(ticket.status)}</td>
                  <td>{getPriorityLabel(ticket.priority)}</td>
                  <td>{getAssigneeLabel(ticket.assignee)}</td>
                  <td>{ticket.reporter}</td>
                  <td>{getCategoryLabel(ticket.category)}</td>
                  <td>{new Date(ticket.created_at).toDateString()}</td>

                  <td onDoubleClick={(e) => e.stopPropagation()}>
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/ticket?id=${ticket.id}&editable=true`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteButton(ticket)}
                    >
                      Delete
                    </button>
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
        <CreateTicketPopUp />
      </div>

      {/* Delete dialog */}
      <Dialog open={isOpen} maxWidth="md" fullWidth onClose={handleOnCancel}>
        <>
          <DialogTitle sx={{ textAlign: "center" }}>
            Do you want to Delete the ticket?
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" color="text.primary">
              Title: {toBeDeleted?.title || ""}
            </Typography>{" "}
            <Typography variant="body1" color="text.primary">
              Status: {toBeDeleted?.status || ""}
            </Typography>{" "}
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmDelete}
            >
              Delete the ticket
            </Button>
            <Button variant="contained" onClick={handleOnCancel}>
              Cancel
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </>
  );
}

export default TicketsView;
