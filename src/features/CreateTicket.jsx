import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { createNewTicket } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../ui/Spinner";
import { setCreateTicketLoading, setErrorMessage } from "../store/ticketsSlice";

function CreateTicketPopUp() {
  const initialState = {
    title: "",
    description: "",
    status: "",
    priority: "",
    assignee: "",
    reporter: "",
    category: "",
  };
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { errorMessage, isNewTicketLoading } = useSelector(
    (state) => state.tickets
  );

  // ✅ centralized validation rules
  const rules = {
    title: (value) => (!value ? "Title is required" : ""),
    description: (value) => (!value ? "Description is required" : ""),
    status: (value) => (!value ? "Status is required" : ""),
    priority: (value) => (!value ? "Priority is required" : ""),
    assignee: (value) => (!value ? "Assignee is required" : ""),
    reporter: (value) => {
      if (!value) return "Reporter is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Reporter email is invalid";
      return "";
    },
    category: (value) => (!value ? "Category is required" : ""),
  };

  // ✅ validate a single field
  function validateField(name, value) {
    const message = rules[name] ? rules[name](value) : "";
    setErrors((prev) => ({
      ...prev,
      [name]: message || undefined,
    }));
  }

  function handleCreateTicket() {
    setErrors({});
    dispatch(setErrorMessage(null));
    setIsOpen(true);
    dispatch(setCreateTicketLoading(false));
  }

  function handleOnCancel() {
    setIsOpen(false);
    setFormData(initialState);
  }

  function handleOnChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // ✅ live validation as user types
    if (errors[name]) {
      validateField(name, value);
    }
  }

  function handleSubmit() {
    let tempErrors = {};
    Object.keys(rules).forEach((field) => {
      const msg = rules[field](formData[field]);
      if (msg) tempErrors[field] = msg;
    });

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      dispatch(createNewTicket(formData)).then((success) => {
        if (success) {
          handleOnCancel();
        }
      });
    }
  }

  return (
    <div>
      <Button variant="contained" onClick={handleCreateTicket}>
        Create Ticket
      </Button>

      <Dialog open={isOpen} onClose={handleOnCancel} maxWidth="md" fullWidth>
        {isNewTicketLoading ? (
          <Spinner />
        ) : (
          <>
            <DialogTitle>Create New Ticket</DialogTitle>
            <DialogContent>
              <Typography> Add new ticket here.</Typography>

              <Grid container spacing={2}>
                {/* Left column */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    margin="dense"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formData.title}
                    onChange={handleOnChange}
                    onBlur={(e) => validateField("title", e.target.value)}
                    error={!!errors.title}
                    helperText={errors.title}
                    required
                  />

                  <FormControl fullWidth margin="dense" error={!!errors.status}>
                    <InputLabel required>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleOnChange}
                      onBlur={(e) => validateField("status", e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="open">Open</MenuItem>
                      <MenuItem value="inprogress">In-Progress</MenuItem>
                      <MenuItem value="closed">Closed</MenuItem>
                    </Select>
                    {errors.status && (
                      <span style={{ color: "red", fontSize: "0.8rem" }}>
                        {errors.status}
                      </span>
                    )}
                  </FormControl>

                  <FormControl
                    fullWidth
                    margin="dense"
                    error={!!errors.priority}
                  >
                    <InputLabel required>Priority</InputLabel>
                    <Select
                      name="priority"
                      value={formData.priority}
                      onChange={handleOnChange}
                      onBlur={(e) => validateField("priority", e.target.value)}
                      label="Priority"
                    >
                      <MenuItem value="urgent">Urgent</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                    </Select>
                    {errors.priority && (
                      <span style={{ color: "red", fontSize: "0.8rem" }}>
                        {errors.priority}
                      </span>
                    )}
                  </FormControl>
                </Grid>

                {/* Right column */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    margin="dense"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formData.description}
                    onChange={handleOnChange}
                    onBlur={(e) => validateField("description", e.target.value)}
                    error={!!errors.description}
                    helperText={errors.description}
                    required
                  />

                  <FormControl
                    fullWidth
                    margin="dense"
                    error={!!errors.assignee}
                  >
                    <InputLabel required>Assignee</InputLabel>
                    <Select
                      name="assignee"
                      value={formData.assignee}
                      onChange={handleOnChange}
                      onBlur={(e) => validateField("assignee", e.target.value)}
                      label="Assignee"
                    >
                      <MenuItem value="sai@tyujhgfji.com">Sai Prasad</MenuItem>
                      <MenuItem value="sahithi@kjhagekyhgfbegr.com">
                        Sahithi
                      </MenuItem>
                      <MenuItem value="shiva@kjkjhghrrg.com">Shiva</MenuItem>
                    </Select>
                    {errors.assignee && (
                      <span style={{ color: "red", fontSize: "0.8rem" }}>
                        {errors.assignee}
                      </span>
                    )}
                  </FormControl>

                  <TextField
                    margin="dense"
                    name="reporter"
                    label="Reporter"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={formData.reporter}
                    onChange={handleOnChange}
                    required
                    onBlur={(e) => validateField("reporter", e.target.value)}
                    error={!!errors.reporter}
                    helperText={errors.reporter}
                  />

                  <FormControl
                    fullWidth
                    margin="dense"
                    error={!!errors.category}
                  >
                    <InputLabel required>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleOnChange}
                      onBlur={(e) => validateField("category", e.target.value)}
                      label="Category"
                    >
                      <MenuItem value="bug">Bug</MenuItem>
                      <MenuItem value="feature">Feature</MenuItem>
                      <MenuItem value="support">Support</MenuItem>
                    </Select>
                    {errors.category && (
                      <span style={{ color: "red", fontSize: "0.8rem" }}>
                        {errors.category}
                      </span>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              {errorMessage && (
                <Grid item xs={12}>
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errorMessage}
                  </Alert>
                </Grid>
              )}
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit new ticket
              </Button>
              <Button variant="contained" onClick={handleOnCancel}>
                Cancel
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}

export default CreateTicketPopUp;
