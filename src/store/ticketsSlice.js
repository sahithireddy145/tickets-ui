import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
};

const ticketsSlice = createSlice({
  name: "ticketsData",
  initialState,
  reducers: {
    addTicket: (state, action) => {
      state.tickets.push(action.payload);
    },
    removeTicket: (state, action) => {
      return state.tickets.filter((ticket) => ticket.id !== action.payload);
    },
  },
});

export const { addTicket, removeTicket } = ticketsSlice.actions;
export default ticketsSlice.reducer;
