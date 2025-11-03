import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteTicket, fetchTickets } from "../services/api";
import { setFilters, setLoading } from "../store/ticketsSlice";
import Spinner from "../ui/Spinner";
import CreateTicketPopUp from "./CreateTicket";

import DeleteDialog from "../ui/DeleteDialog";
import PaginationComponent from "../ui/PaginationComponent";
import {
  Box,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchComponent from "../ui/SearchComponent";
import FilterComponent from "../ui/FilterComponent";

function TicketsView() {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [paginationUI, setPaginationUI] = useState(null);
  const [ticketsPerPage, setTicketsPerPage] = useState(10);
  const [isFilter, setIsFilter] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const [toBeDeleted, setToBeDeleted] = useState(null);
  const [confirmedDeleteId, setConfirmedDeleteId] = useState(null);

  const { tickets, totalTicketCount, loading, searchText, filters } =
    useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(setLoading(true));
    console.log("TicketsView use Effect ", searchText);
    dispatch(fetchTickets(page, ticketsPerPage, searchText, filters));
  }, [dispatch, page, ticketsPerPage, searchText, filters]);

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
  console.log(confirmedDeleteId, page, ticketsPerPage);
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

  function handleOnFilter() {
    setIsFilter(true);
  }

  function handleOnFilterReset() {
    dispatch(setFilters(null));
    setIsReset((reset) => !reset);
  }

  function handleOnCloseIcon(key) {
    const updatedFilters = { ...filters, [key]: "" };
    dispatch(setFilters(updatedFilters));
  }

  return (
    <>
      <div>
        <h2>Tickets</h2>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mt: 2,
            mb: 2,
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOnFilter}
            >
              Filter
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOnFilterReset}
            >
              Reset
            </Button>

            <Box>
              {filters &&
                Object.entries(filters)
                  .filter(([_, value]) => value)
                  .map(([key, value]) => (
                    <Chip
                      key={key}
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          {value}

                          <IconButton>
                            <CloseIcon onClick={() => handleOnCloseIcon(key)} />
                          </IconButton>
                        </Box>
                      }
                      // onDelete={() => handleDelete(key)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
            </Box>
          </div>

          <SearchComponent
            page={page}
            setPage={setPage}
            itemsPerPage={ticketsPerPage}
            setTicketsPerPage={setTicketsPerPage}
          />
        </Box>

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
      <FilterComponent
        isFilter={isFilter}
        setIsFilter={setIsFilter}
        isReset={isReset}
      />
    </>
  );
}

export default TicketsView;
