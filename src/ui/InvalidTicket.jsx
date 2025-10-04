import { useNavigate } from "react-router-dom";

function InvalidTicket() {
  const navigate = useNavigate();
  return (
    <div>
      <h2 style={{ color: "red" }}>
        Ticket Number is invalid. Please try again.
      </h2>
      <button onClick={() => navigate("/")}>🔙Home</button>
    </div>
  );
}

export default InvalidTicket;
