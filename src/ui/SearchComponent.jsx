import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../services/api";
import { setSearchText } from "../store/ticketsSlice";

function SearchComponent({ page, itemsPerPage, setTicketsPerPage, setPage }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.tickets.filters);

  const [searchValue, setSearchValue] = useState("");

  function handleReset() {
    setSearchValue("");
    setTicketsPerPage(10);
    console.log("Handle Reset");
    dispatch(setSearchText(null));
    setPage(1);
  }

  function handleSearch() {
    console.log("Handle Search");
    dispatch(fetchTickets(1, itemsPerPage, searchValue, filters));
    dispatch(setSearchText(searchValue));
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        mt: 0,
        marginBottom: 0,
      }}
    >
      <TextField
        label="Enter search text"
        variant="outlined"
        size="small"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && searchValue.length >= 3) {
            handleSearch();
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        disabled={searchValue.length < 3}
      >
        Search
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={!searchValue}
        onClick={handleReset}
      >
        Reset
      </Button>
    </Box>
  );
}

export default SearchComponent;
