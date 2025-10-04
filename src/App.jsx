import { BrowserRouter, Route, Routes } from "react-router-dom";
import TicketsView from "./features/TicketsView";
import TicketDetails from "./features/TicketDetails";
import HeaderLayout from "./features/HeaderLayout";

function App() {
  return (
    <BrowserRouter>
      <HeaderLayout>
        <Routes>
          <Route path="/" element={<TicketsView />} />
          <Route path="ticket" element={<TicketDetails />} />
        </Routes>
      </HeaderLayout>
    </BrowserRouter>
  );
}

export default App;
