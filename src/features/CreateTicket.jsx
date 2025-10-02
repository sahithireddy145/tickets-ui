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
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    assignee: "",
    reporter: "",
    category: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { errorMessage, isNewTicketLoading } = useSelector(
    (state) => state.tickets
  );

  function handleCreateTicket() {
    dispatch(setErrorMessage(null));
    setIsOpen(true);
    dispatch(setCreateTicketLoading(false));
  }

  function handleOnCancel() {
    setIsOpen(false);
    setFormData({
      title: "",
      description: "",
      status: "",
      priority: "",
      assignee: "",
      reporter: "",
      category: "",
    });
  }

  function handleOnChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    let tempErrors = {};

    if (!formData.title) tempErrors.title = "Title is required";
    if (!formData.description)
      tempErrors.description = "Description is required";
    if (!formData.status) tempErrors.status = "Status is required";
    if (!formData.priority) tempErrors.priority = "Priority is required";
    if (!formData.assignee) tempErrors.assignee = "Assignee is required";
    if (!formData.reporter) {
      tempErrors.reporter = "Reporter is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.reporter)) {
      tempErrors.reporter = "Reporter email is invalid";
    }
    if (!formData.category) tempErrors.category = "Category is required";

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
                    error={!!errors.title}
                    helperText={errors.title}
                  />

                  <FormControl fullWidth margin="dense" error={!!errors.status}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleOnChange}
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
                    <InputLabel>Priority</InputLabel>
                    <Select
                      name="priority"
                      value={formData.priority}
                      onChange={handleOnChange}
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
                    error={!!errors.description}
                    helperText={errors.description}
                  />

                  <FormControl
                    fullWidth
                    margin="dense"
                    error={!!errors.assignee}
                  >
                    <InputLabel>Assignee</InputLabel>
                    <Select
                      name="assignee"
                      value={formData.assignee}
                      onChange={handleOnChange}
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
                    error={!!errors.reporter}
                    helperText={errors.reporter}
                  />

                  <FormControl
                    fullWidth
                    margin="dense"
                    error={!!errors.category}
                  >
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleOnChange}
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
