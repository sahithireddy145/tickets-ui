import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchTicketById } from "../services/api";
import Spinner from "../ui/Spinner";
import InvalidTicket from "./InvalidTicket";
import { setTicketItem } from "../store/ticketsSlice";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";

import {
  ASSIGNEE_OPTIONS,
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from "./constants/constants";
import {
  getAssigneeLabel,
  getCategoryLabel,
  getPriorityLabel,
  getStatusLabel,
} from "../utils/utils";

function TicketDetails() {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const editable = searchParams.get("editable");

  const { currentTicket, currentTicketLoading } = useSelector(
    (state) => state.tickets
  );

  useEffect(() => {
    return () => {
      dispatch(setTicketItem(null));
    };
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchTicketById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentTicket) {
      setFormData(currentTicket);
    }
  }, [currentTicket]);

  if (!id) return <InvalidTicket />;
  if (currentTicketLoading) return <Spinner />;
  if (!currentTicket) return <InvalidTicket />;

  console.log(formData);
  return (
    <>
      {" "}
      <Button variant="contained" onClick={() => navigate("/")}>
        🔙 Home
      </Button>
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          Ticket Details
        </Typography>

        {editable === "true" ? (
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Save clicked:", formData);
              // TODO: call updateTicket API here
              navigate(`/ticketDetails?id=${id}`);
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 400,
            }}
          >
            <TextField
              label="Title"
              value={formData?.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={formData?.status || ""}
                label="Status"
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                value={formData?.priority || ""}
                label="Priority"
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              >
                {PRIORITY_OPTIONS.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="assignee-label">Assignee</InputLabel>
              <Select
                labelId="assignee-label"
                value={formData?.assignee || ""}
                label="Assignee"
                onChange={(e) =>
                  setFormData({ ...formData, assignee: e.target.value })
                }
              >
                {ASSIGNEE_OPTIONS.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Reporter"
              value={formData?.reporter || ""}
              onChange={(e) =>
                setFormData({ ...formData, reporter: e.target.value })
              }
              fullWidth
            />

            {/* <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={formData?.category || ""}
                label="Category"
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <MenuItem value="bug">Bug</MenuItem>
                <MenuItem value="feature">Feature</MenuItem>
                <MenuItem value="support">Support</MenuItem>
              </Select>
            </FormControl> */}

            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={formData?.category || ""}
                label="Category"
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(`/ticketDetails?id=${id}`)}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box sx={{ mb: 2 }}>
            <Typography>
              <strong>ID:</strong> {currentTicket.id}
            </Typography>
            <Typography>
              <strong>Title:</strong> {currentTicket.title}
            </Typography>
            <Typography>
              <strong>Status:</strong> {getStatusLabel(currentTicket.status)}
            </Typography>
            <Typography>
              <strong>Priority:</strong>{" "}
              {getPriorityLabel(currentTicket.priority)}
            </Typography>
            <Typography>
              <strong>Assignee:</strong>{" "}
              {getAssigneeLabel(currentTicket.assignee)}
            </Typography>
            <Typography>
              <strong>Reporter:</strong> {currentTicket.reporter}
            </Typography>
            <Typography>
              <strong>Category:</strong>{" "}
              {getCategoryLabel(currentTicket.category)}
            </Typography>
            <Typography>
              <strong>Created At:</strong>{" "}
              {new Date(currentTicket.created_at).toLocaleString()}
            </Typography>

            <Stack direction="row" spacing={2} mt={2}>
              <Button
                variant="outlined"
                onClick={() =>
                  navigate(`/ticketDetails?id=${id}&editable=true`)
                }
              >
                ✏️ Edit
              </Button>
              <Button variant="outlined">🗑️ Delete</Button>
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
}

export default TicketDetails;
