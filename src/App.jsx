import { BrowserRouter, Route, Routes } from "react-router-dom";
import TicketsView from "./features/TicketsView";
import CreateTicket from "./features/CreateTicket";
import TicketDetails from "./features/TicketDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TicketsView />} />
        <Route path="ticket" element={<TicketDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
