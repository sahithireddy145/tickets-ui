import { setTickets } from "../store/ticketsSlice";
import Spinner from "../ui/Spinner";

export const API_URL =
  "https://sppmejxkbvjfypfvqyrq.supabase.co/rest/v1/tickets";

export const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwcG1lanhrYnZqZnlwZnZxeXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMzQ1ODYsImV4cCI6MjA3NDgxMDU4Nn0.fYAwJBug1DZYa3_3LxnnHMZi7aAZqU8Lix8w6QcTaLU";

const HEADERS = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export function fetchTickets() {
  return async function (dispatch) {
    try {
      const res = await fetch(API_URL, {
        headers: HEADERS,
      });
      const data = await res.json();
      console.log(data);

      if (!data) return <Spinner />;

      dispatch(setTickets(data));
    } catch (err) {
      console.log(err);
    }
  };
}
