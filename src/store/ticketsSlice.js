import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  loading: false,
  currentTicket: null,
  currentTicketLoading: true,
};

const ticketsSlice = createSlice({
  name: "ticketsData",
  initialState,
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload;
      state.loading = false; // data finished loading
    },
    getTicketItem: (state, action) => {
      state.currentTicket = action.payload;
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
    setCurrentTicketLoading: (state, action) => {
      state.currentTicketLoading = action.payload;
    },
  },
});

export const {
  setTickets,
  addTicket,
  removeTicket,
  setLoading,
  getTicketItem,
  setCurrentTicketLoading,
} = ticketsSlice.actions;
export default ticketsSlice.reducer;
