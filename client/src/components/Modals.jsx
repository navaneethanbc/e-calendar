import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Checkbox,
} from "@mui/material";

export const EventModal = ({ open, handleClose }) => {
  return (
    <Box position={"absolute"} zIndex={100}>
      <Dialog
        open={open}
        onClose={handleClose} // This ensures the modal closes when clicking outside
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Create Event</DialogTitle>
        <DialogContent>
          <TextField
            //   autoFocus
            margin="dense"
            label="Event Title"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Event Description"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
          />
          <Box display="flex" gap={2}>
            <TextField
              margin="dense"
              label="Starts At"
              type="datetime-local"
              fullWidth
              // InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              label="Ends At"
              type="datetime-local"
              fullWidth
              //   InputLabelProps={{ shrink: true }}
            />
          </Box>
          <FormControl margin="dense" size="small" variant="standard">
            <Select defaultValue={"none"}>
              <MenuItem value="none">Does not repeat</MenuItem>
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
            <Select defaultValue={"none"}>
              <MenuItem value="none">No reminder</MenuItem>
              <MenuItem value="15 mins">15 minutes before</MenuItem>
              <MenuItem value="30 mins">30 minutes before</MenuItem>
              <MenuItem value="1 hr">1 hour before</MenuItem>
              <MenuItem value="12 hrs">12 hours before</MenuItem>
              <MenuItem value="1 day">1 day before</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Invite People"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export const SearchModal = () => {
  return <></>;
};
