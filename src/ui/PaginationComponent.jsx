import { useEffect } from "react";
import {
  getAssigneeLabel,
  getCategoryLabel,
  getPriorityLabel,
  getStatusLabel,
} from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { Pagination, Tooltip } from "@mui/material";
import { format } from "date-fns";

function PaginationComponent({
  tickets,
  itemsPerPage,
  handleDeleteButton,
  setPaginationUI,
  page,
  setPage,
  totalTicketCount,
}) {
  const totalPages = Math.ceil(totalTicketCount / itemsPerPage);

  const navigate = useNavigate();

  // console.log("Tickets length =", tickets.length);
  // console.log("Total Pages =", totalPages);

  // const startIndex = (page - 1) * itemsPerPage;
  // // console.log("Start index =", startIndex);

  const currentPageData = tickets;

  // console.log("Current page Data", currentPageData);

  console.log("I am at page: ", page);

  useEffect(() => {
    if (setPaginationUI) {
      setPaginationUI(
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          sx={{ marginTop: 2 }}
        />
      );
    }
  }, [setPaginationUI, totalPages, page, setPage]);

  console.log("I am at page: ", page);

  return (
    <>
      {currentPageData.map((ticket) => (
        <tr
          key={ticket.id}
          onDoubleClick={() => navigate(`/ticket?id=${ticket.id}`)}
          style={{ cursor: "default" }}
        >
          <td>
            <Tooltip title={ticket.id}>
              <span>{ticket.id.slice(-6)}</span>
            </Tooltip>
          </td>
          <td>{ticket.title}</td>
          <td>{getStatusLabel(ticket.status)}</td>
          <td>{getPriorityLabel(ticket.priority)}</td>
          <td>
            <Tooltip title={ticket.assignee}>
              <span> {getAssigneeLabel(ticket.assignee)}</span>
            </Tooltip>
          </td>
          <td>{ticket.reporter}</td>
          <td>{getCategoryLabel(ticket.category)}</td>
          <td>
            {ticket.created_at
              ? format(new Date(ticket.created_at), "dd MMM yyyy • hh:mm a")
              : "—"}
          </td>

          <td onDoubleClick={(e) => e.stopPropagation()}>
            <button
              style={{ cursor: "pointer", margin: "5px" }}
              onClick={() => navigate(`/ticket?id=${ticket.id}&editable=true`)}
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
    </>
  );
}

export default PaginationComponent;
