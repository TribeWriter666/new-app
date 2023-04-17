import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import supabase from "../../supabaseClient";

function LoginDialog(props) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [capsLockWarning, setCapsLockWarning] = useState(false);

  const login = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      props.setAuth({ user });
      props.onClose();
    } catch (error) {
      console.error("Error logging in:", error.message);
      setErrorMessage(error.message);
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
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              login(usernameInput, passwordInput);
            }
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
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              login(usernameInput, passwordInput);
            }
          }}
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
