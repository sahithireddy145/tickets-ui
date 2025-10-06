import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteTicket, editTicket, fetchTicketById } from "../services/api";
import Spinner from "../ui/Spinner";
import InvalidTicket from "../ui/InvalidTicket";
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

import { format } from "date-fns";

import {
  ASSIGNEE_OPTIONS,
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  VALIDATION_RULES,
} from "../constants/constants";
import {
  getAssigneeLabel,
  getCategoryLabel,
  getPriorityLabel,
  getStatusLabel,
} from "../utils/utils";
import DeleteDialog from "../ui/DeleteDialog";

function TicketDetails() {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const editable = searchParams.get("editable");

  const { currentTicket, currentTicketLoading } = useSelector(
    (state) => state.tickets
  );

  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});

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

  // ✅ Validate a single field
  function validateField(name, value) {
    const message = VALIDATION_RULES[name] ? VALIDATION_RULES[name](value) : "";
    setErrors((prev) => ({
      ...prev,
      [name]: message || undefined,
    }));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    //dynamic validation
    if (VALIDATION_RULES[name]) {
      validateField(name, value);
    }
  }

  if (!id) return <InvalidTicket />;
  if (currentTicketLoading) return <Spinner />;
  if (!currentTicket) return <InvalidTicket />;

  function handleOnEdit() {
    setErrors({});
    navigate(`/ticket?id=${id}&editable=true`);
  }

  function handleOnConfirm(e) {
    e.preventDefault();

    let tempErrors = {};
    Object.keys(VALIDATION_RULES).forEach((field) => {
      const msg = VALIDATION_RULES[field](formData[field]);
      if (msg) tempErrors[field] = msg;
    });
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      dispatch(editTicket(formData.id, formData)).then((success) => {
        if (success) {
          handleOnCancel();
        }
      });
      searchParams.set("editable", "false");
      setSearchParams(searchParams);
    }
  }

  function handleOnCancel() {
    setIsOpen(false);
    setErrors({});

    if (currentTicket) setFormData(currentTicket);

    navigate(`/ticket?id=${id}`);
  }

  function handleDeleteButton() {
    setIsOpen(true);
  }

  function handleConfirmDelete() {
    dispatch(deleteTicket(id, null, null, true));
    navigate("/");
    setIsOpen(false);
  }

  return (
    <>
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
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 400,
            }}
          >
            {/* ✅ Title Field */}
            <TextField
              name="title"
              label="Title"
              value={formData?.title || ""}
              onChange={handleInputChange} //Every keyStroke
              onBlur={(e) => validateField("title", e.target.value)} // When user leaves the field
              fullWidth
              error={!!errors.title}
              helperText={errors.title}
              required
            />

            {/* ✅ Status */}
            <FormControl fullWidth error={!!errors.status}>
              <InputLabel id="status-label" required>
                Status
              </InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={formData?.status || ""}
                onChange={handleInputChange}
                onBlur={(e) => validateField("status", e.target.value)}
                label="Status"
              >
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.status && (
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.status}
                </span>
              )}
            </FormControl>

            {/* ✅ Priority */}
            <FormControl fullWidth error={!!errors.priority}>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                name="priority"
                value={formData?.priority || ""}
                onChange={handleInputChange}
                onBlur={(e) => validateField("priority", e.target.value)}
                label="Priority"
              >
                {PRIORITY_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.priority && (
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.priority}
                </span>
              )}
            </FormControl>

            {/* ✅ Assignee */}
            <FormControl fullWidth error={!!errors.assignee}>
              <InputLabel id="assignee-label">Assignee</InputLabel>
              <Select
                labelId="assignee-label"
                name="assignee"
                value={formData?.assignee || ""}
                onChange={handleInputChange}
                onBlur={(e) => validateField("assignee", e.target.value)}
                label="Assignee"
              >
                {ASSIGNEE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.assignee && (
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.assignee}
                </span>
              )}
            </FormControl>

            {/* ✅ Reporter */}
            <TextField
              name="reporter"
              label="Reporter"
              value={formData?.reporter || ""}
              onChange={handleInputChange}
              onBlur={(e) => validateField("reporter", e.target.value)}
              fullWidth
              error={!!errors.reporter}
              helperText={errors.reporter}
              required
            />

            {/* ✅ Category */}
            <FormControl fullWidth error={!!errors.category}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={formData?.category || ""}
                onChange={handleInputChange}
                onBlur={(e) => validateField("category", e.target.value)}
                label="Category"
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.category}
                </span>
              )}
            </FormControl>

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleOnConfirm}
              >
                Confirm
              </Button>
              <Button variant="outlined" onClick={handleOnCancel}>
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
              {currentTicket.created_at
                ? format(
                    new Date(currentTicket.created_at),
                    "dd MMM yyyy • hh:mm a"
                  )
                : "—"}
            </Typography>

            <Stack direction="row" spacing={2} mt={2}>
              <Button variant="outlined" onClick={handleOnEdit}>
                ✏️ Edit
              </Button>
              <Button variant="outlined" onClick={handleDeleteButton}>
                🗑️ Delete
              </Button>
            </Stack>
          </Box>
        )}
      </Box>

      {/* Delete dialog */}
      <DeleteDialog
        isOpen={isOpen}
        handleOnCancel={handleOnCancel}
        toBeDeleted={currentTicket}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default TicketDetails;
