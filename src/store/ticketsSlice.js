import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  loading: false,
};

const ticketsSlice = createSlice({
  name: "ticketsData",
  initialState,
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload;
      state.loading = false; // data finished loading
    },
    addTicket: (state, action) => {
      state.tickets.push(action.payload);
    },
    removeTicket: (state, action) => {
      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setTickets, addTicket, removeTicket, setLoading } =
  ticketsSlice.actions;
export default ticketsSlice.reducer;
