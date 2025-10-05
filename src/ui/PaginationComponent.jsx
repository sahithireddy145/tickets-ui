import { useEffect } from "react";
import {
  getAssigneeLabel,
  getCategoryLabel,
  getPriorityLabel,
  getStatusLabel,
} from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";

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
