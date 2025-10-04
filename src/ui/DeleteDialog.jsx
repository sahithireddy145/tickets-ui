import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

function DeleteDialog({
  isOpen,
  handleOnCancel,
  toBeDeleted,
  handleConfirmDelete,
}) {
  return (
    <Dialog open={isOpen} maxWidth="md" fullWidth onClose={handleOnCancel}>
      <>
        <DialogTitle sx={{ textAlign: "center" }}>
          Do you want to Delete the ticket?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.primary">
            Title: {toBeDeleted?.title || ""}
          </Typography>{" "}
          <Typography variant="body1" color="text.primary">
            Status: {toBeDeleted?.status || ""}
          </Typography>{" "}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmDelete}
          >
            Delete the ticket
          </Button>
          <Button variant="contained" onClick={handleOnCancel}>
            Cancel
          </Button>
        </DialogActions>
      </>
    </Dialog>
  );
}

export default DeleteDialog;
