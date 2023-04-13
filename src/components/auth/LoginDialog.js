import axios from "axios";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

function LoginDialog(props) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [capsLockWarning, setCapsLockWarning] = useState(false);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      console.log(response.data);
      props.setAuth(response.data); // Update auth state
      props.onClose();
    } catch (error) {
      console.error("Error logging in:", error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleKeyDown = (event) => {
    if (event.getModifierState("CapsLock")) {
      setCapsLockWarning(true);
    } else {
      setCapsLockWarning(false);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent style={{ minHeight: "200px" }}>
        <TextField
          label="Email"
          fullWidth
          value={usernameInput}
          onChange={(e) => {
            setUsernameInput(e.target.value);
            setErrorMessage("");
          }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={passwordInput}
          onChange={(e) => {
            setPasswordInput(e.target.value);
            setErrorMessage("");
          }}
          onKeyDown={handleKeyDown}
        />
        {capsLockWarning && (
          <p style={{ color: "orange" }}>Warning: Caps lock is on</p>
        )}

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => login(usernameInput, passwordInput)}
          color="primary"
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginDialog;
