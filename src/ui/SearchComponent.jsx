import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTickets } from "../services/api";
import { setSearchText } from "../store/ticketsSlice";

function SearchComponent({ page, itemsPerPage, setTicketsPerPage, setPage }) {
  const dispatch = useDispatch();
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
    dispatch(fetchTickets(1, itemsPerPage, searchValue));
    dispatch(setSearchText(searchValue));
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: 0.5,
        alignItems: "right",
        justifyContent: "right",
        mt: 3,
        marginBottom: 1.5,
      }}
    >
      <TextField
        label="Enter text"
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
      <Button variant="contained" color="primary" onClick={handleReset}>
        Reset
      </Button>
    </Box>
  );
}

export default SearchComponent;
