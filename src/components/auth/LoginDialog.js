import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

function LoginDialog(props) {
  // Component logic
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField label="Email" fullWidth />
        <TextField label="Password" type="password" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button color="primary">Login</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginDialog;
