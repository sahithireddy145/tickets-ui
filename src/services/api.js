import {
  getTickets,
  setTicketItem,
  setCurrentTicketLoading,
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
  Prefer: "count=exact",
};

export function fetchTickets(
  page = 1,
  itemsPerPage = 5,
  searchValue,
  filterValue
) {
  return async function (dispatch) {
    try {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage - 1;

      let url = `${API_URL}?select=*`;

      if (searchValue) url = `${API_URL}?title=ilike.*${searchValue}*`;

      if (filterValue) {
        Object.keys(filterValue).map((key) => {
          if (filterValue[key]) url = url + `&${key}=eq.${filterValue[key]}`;
        });
      }

      const res = await fetch(url, {
        headers: { ...HEADERS, Range: `${start}-${end}` },
      });

      const data = await res.json();

      const contentRange = res.headers.get("content-range"); // e.g. "0-4/57"
      const totalTicketCount = contentRange
        ? parseInt(contentRange.split("/")[1], 10)
        : 0;

      if (!data) return <Spinner />;

      dispatch(getTickets({ data, totalTicketCount }));
    } catch (err) {
      console.error("I am coming from fetch tickets call in api.js ", err);
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

// export function fetchTicketsByTitle(searchValue) {
//   return async function (dispatch) {
//     try {
//       const res = await fetch(`${API_URL}?title=ilike.*${searchValue}*`, {
//         headers: HEADERS,
//       });

//       if (!res.ok) throw new Error("Failed to fetch");
//       const data = await res.json();

//       dispatch(getTickets({ data , totalTicketCount}));

//       console.log(data);
//     } catch (err) {
//       console.error("I am coming from title fetch: ", err.message);
//     }
//   };
// }

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
        dispatch(setCreateTicketLoading(false));
        dispatch(setErrorMessage(errorText));

        return false;
      }
      dispatch(setErrorMessage(null));
      dispatch(fetchTickets(1, 10));

      return true;
    } catch (err) {
      console.error("❌ Error creating ticket:", err.message);
      dispatch(setErrorMessage(err.message));
      dispatch(setCreateTicketLoading(false));
    }
  };
}

export function editTicket(id, updatedTicket) {
  return async function (dispatch) {
    try {
      console.log("Update Ticket called");
      const res = await fetch(`${API_URL}?id=eq.${id}`, {
        method: "PATCH",
        headers: HEADERS,
        body: JSON.stringify(updatedTicket),
      });

      if (!res.ok) {
        const error = await res.text();
        const errorText = JSON.parse(error).message;
        console.log(errorText);
      }
      dispatch(setTicketItem(updatedTicket));
    } catch (err) {
      console.error(err.message);
    }
  };
}

export function deleteTicket(id, page = 1, ticketsPerPage = 5, noFetch) {
  return async function (dispatch, getState) {
    try {
      console.log("Delete Ticket called");
      const res = await fetch(`${API_URL}?id=eq.${id}`, {
        method: "DELETE",
        headers: HEADERS,
      });

      if (!res.ok) {
        const error = await res.text();
        const errorText = JSON.parse(error).message;
        console.log(errorText);
      }
      const state = getState();
      console.log("I am tickets Per Page", ticketsPerPage);
      if (!noFetch)
        dispatch(
          fetchTickets(
            page,
            ticketsPerPage,
            state.tickets.searchText,
            state.tickets.filters
          )
        );
    } catch (err) {
      console.error(err.message);
    }
  };
}
