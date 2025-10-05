import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteTicket, fetchTickets } from "../services/api";
import { setLoading } from "../store/ticketsSlice";
import Spinner from "../ui/Spinner";
import CreateTicketPopUp from "./CreateTicket";

import {
  getAssigneeLabel,
  getCategoryLabel,
  getPriorityLabel,
  getStatusLabel,
} from "../utils/utils";
import DeleteDialog from "../ui/DeleteDialog";
import PaginationComponent from "../ui/PaginationComponent";

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
                      style={{ cursor: "pointer", margin: "5px" }}
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
              <PaginationComponent
                tickets={tickets}
                itemsPerPage={5}
                handleDeleteButton={handleDeleteButton}
              />
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

      <DeleteDialog
        isOpen={isOpen}
        handleOnCancel={handleOnCancel}
        toBeDeleted={toBeDeleted}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default TicketsView;
