import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

const RegisterDialog = ({ open, onClose, setAuth }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/check-username-availability?username=${username}`
      );
      setUsernameAvailable(response.data.available);
    } catch (error) {
      console.error(
        "Error checking username availability:",
        error.response.data.message
      );
    }
  };

  useEffect(() => {
    if (usernameInput) {
      checkUsernameAvailability(usernameInput);
    } else {
      setUsernameAvailable(null);
    }
  }, [usernameInput]);

  const register = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:3001/register", {
        username,
        password,
      });
      console.log(response.data);
      setAuth(response.data);
      onClose();
    } catch (error) {
      console.error("Error registering:", error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          fullWidth
          value={usernameInput}
          onChange={(e) => {
            setUsernameInput(e.target.value);
            setUsernameAvailable(null);
            setErrorMessage("");
          }}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={passwordInput}
          onChange={(e) => {
            setPasswordInput(e.target.value);
            setErrorMessage("");
          }}
        />

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => register(usernameInput, passwordInput)}>
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterDialog;
