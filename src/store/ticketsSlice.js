import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  loading: false,
  currentTicket: null,
  currentTicketLoading: true,
  errorMessage: "",
  isNewTicketLoading: false,
};

const ticketsSlice = createSlice({
  name: "ticketsData",
  initialState,
  reducers: {
    getTickets: (state, action) => {
      state.tickets = action.payload;
      state.loading = false; // data finished loading
    },
    setTicketItem: (state, action) => {
      state.currentTicket = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurrentTicketLoading: (state, action) => {
      state.currentTicketLoading = action.payload;
    },
    setCreateTicketLoading: (state, action) => {
      state.isNewTicketLoading = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  getTickets,
  setLoading,
  setTicketItem,
  setCurrentTicketLoading,
  setErrorMessage,
  setCreateTicketLoading,
} = ticketsSlice.actions;
export default ticketsSlice.reducer;
