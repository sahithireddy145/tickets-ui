import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import {
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from "../constants/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../services/api";
import { setFilters } from "../store/ticketsSlice";

function FilterComponent({ isFilter, setIsFilter, isReset }) {
  const initialState = {
    status: "",
    priority: "",
    category: "",
  };

  const dispatch = useDispatch();

  const searchText = useSelector((state) => state.tickets.searchText);

  const [filterValue, setFilterValue] = useState(initialState);

  useEffect(
    function () {
      setFilterValue(initialState);
    },
    [isReset]
  );

  function handleOnChange(e) {
    const { name, value } = e.target;

    setFilterValue({
      ...filterValue,
      [name]: value,
    });
  }

  function handleOnApply() {
    dispatch(setFilters(filterValue));
    dispatch(fetchTickets(1, 10, searchText, filterValue));
    handleOnCancel();
  }

  function handleOnCancel() {
    setIsFilter(false);
    // setFilterValue(initialState);
  }

  return (
    <div>
      <Dialog open={isFilter} onClose={handleOnCancel} fullWidth maxWidth="xs">
        <DialogTitle>Filter Tickets</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={filterValue.status}
                onChange={handleOnChange}
              >
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                label="Priority"
                name="priority"
                value={filterValue.priority}
                onChange={handleOnChange}
              >
                {PRIORITY_OPTIONS.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                name="category"
                value={filterValue.category}
                onChange={handleOnChange}
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleOnApply}>
            Apply
          </Button>
          <Button onClick={handleOnCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FilterComponent;
