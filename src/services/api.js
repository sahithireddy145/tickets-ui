import {
  getTickets,
  setTicketItem,
  setLoading,
  setCurrentTicketLoading,
  addTicket,
  setErrorMessage,
  setCreateTicketLoading,
} from "../store/ticketsSlice";
import Spinner from "../ui/Spinner";

export const API_URL =
  "https://sppmejxkbvjfypfvqyrq.supabase.co/rest/v1/tickets";

export const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwcG1lanhrYnZqZnlwZnZxeXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMzQ1ODYsImV4cCI6MjA3NDgxMDU4Nn0.fYAwJBug1DZYa3_3LxnnHMZi7aAZqU8Lix8w6QcTaLU";

const HEADERS = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export function fetchTickets() {
  return async function (dispatch) {
    try {
      const res = await fetch(API_URL, {
        headers: HEADERS,
      });
      const data = await res.json();

      if (!data) return <Spinner />;

      dispatch(getTickets(data));
    } catch (err) {
      console.log(err);
    }
  };
}

export function fetchTicketById(id) {
  return async function (dispatch) {
    try {
      dispatch(setCurrentTicketLoading(true));
      const res = await fetch(`${API_URL}?id=eq.${id}`, {
        headers: HEADERS,
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      dispatch(setTicketItem(data[0]));
      dispatch(setCurrentTicketLoading(false));
    } catch (err) {
      dispatch(setCurrentTicketLoading(false));
      console.error("Error Fetching ticket: ", err.message);
    }
  };
}

export function createNewTicket(newTicket) {
  return async function (dispatch) {
    try {
      dispatch(setErrorMessage(null));
      dispatch(setCreateTicketLoading(true));
      const res = await fetch(API_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(newTicket),
      });

      if (!res.ok) {
        const error = await res.text();
        const errorText = JSON.parse(error).message;
        // console.log("Coming from api: ", errorText.message);
        dispatch(setCreateTicketLoading(false));
        dispatch(setErrorMessage(errorText));

        return false;
      }

      const data = await res.json();
      console.log("Ticket Created: ", data[0]);
      dispatch(addTicket(data[0]));
      dispatch(setErrorMessage(null));
      dispatch(fetchTickets());

      return true;
    } catch (err) {
      console.error("❌ Error creating ticket:", err.message);
      dispatch(setErrorMessage(err.message));
    }
  };
}
