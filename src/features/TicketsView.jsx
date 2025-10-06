import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteTicket, fetchTickets } from "../services/api";
import { setLoading } from "../store/ticketsSlice";
import Spinner from "../ui/Spinner";
import CreateTicketPopUp from "./CreateTicket";

import DeleteDialog from "../ui/DeleteDialog";
import PaginationComponent from "../ui/PaginationComponent";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import SearchComponent from "../ui/SearchComponent";

function TicketsView() {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [paginationUI, setPaginationUI] = useState(null);
  const [ticketsPerPage, setTicketsPerPage] = useState(10);

  const [toBeDeleted, setToBeDeleted] = useState(null);
  const [confirmedDeleteId, setConfirmedDeleteId] = useState(null);

  const { tickets, totalTicketCount, loading, searchText } = useSelector(
    (state) => state.tickets
  );

  useEffect(() => {
    dispatch(setLoading(true));
    console.log("TicketsView use Effect ", searchText);
    dispatch(fetchTickets(page, ticketsPerPage, searchText));
  }, [dispatch, page, ticketsPerPage, searchText]);

  useEffect(
    function () {
      if (!loading && tickets.length === 0 && page > 1) {
        setPage((page) => (page > 1 ? page - 1 : page));
      }
    },
    [tickets, loading]
  );

  function handleDeleteButton(ticket) {
    setIsOpen(true);
    setConfirmedDeleteId(ticket.id);
    setToBeDeleted(ticket);
  }

  function handleConfirmDelete() {
    dispatch(deleteTicket(confirmedDeleteId, page, ticketsPerPage));
    setIsOpen(false);
  }

  function handleOnCancel() {
    setIsOpen(false);
  }

  function handleOnTicketCountChange(e) {
    setTicketsPerPage(e.target.value);
    setPage(1);
  }

  return (
    <>
      <div>
        <h2>Tickets</h2>
        <SearchComponent
          page={page}
          setPage={setPage}
          itemsPerPage={ticketsPerPage}
          setTicketsPerPage={setTicketsPerPage}
        />

        {loading ? (
          <Spinner />
        ) : totalTicketCount > 0 ? (
          <>
            {" "}
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
                <PaginationComponent
                  tickets={tickets}
                  itemsPerPage={ticketsPerPage}
                  handleDeleteButton={handleDeleteButton}
                  setPaginationUI={setPaginationUI}
                  page={page}
                  setPage={setPage}
                  totalTicketCount={totalTicketCount}
                />
              </tbody>
            </table>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center", // centers the whole group
                alignItems: "center",
                marginTop: "20px",
                gap: 2, // space between dropdown and pagination
              }}
            >
              <FormControl
                size="small"
                sx={{
                  minWidth: 60, // control width
                }}
              >
                {/* <InputLabel id="ticket_count">Tickets per page</InputLabel> */}
                <Select
                  labelId="ticket_count"
                  id="ticket_count"
                  value={ticketsPerPage}
                  // label="Tickets per page"
                  onChange={handleOnTicketCountChange}
                >
                  {/* <MenuItem value={2}>2</MenuItem> */}
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>

              {paginationUI}
            </Box>
            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              {paginationUI}
            </div> */}
          </>
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
