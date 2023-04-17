import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import supabase from "./supabase";

const RegisterDialog = ({ open, onClose, setAuth }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  const checkUsernameAvailability = async (username) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("username")
        .eq("username", username)
        .single();

      if (error && !error.message.includes("No rows")) {
        throw error;
      }

      setUsernameAvailable(!data);
    } catch (error) {
      console.error("Error checking username availability:", error.message);
    }
  };

  useEffect(() => {
    if (usernameInput) {
      checkUsernameAvailability(usernameInput);
    } else {
      setUsernameAvailable(null);
    }
  }, [usernameInput]);

  const register = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setAuth({ user });
      onClose();
    } catch (error) {
      console.error("Error registering:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent style={{ minHeight: "220px" }}>
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
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              register(usernameInput, passwordInput);
            }
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
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              register(usernameInput, passwordInput);
            }
          }}
        />
        {usernameAvailable !== null && (
          <p style={{ color: usernameAvailable ? "green" : "red" }}>
            {usernameAvailable
              ? "Username available"
              : "Username already taken"}
          </p>
        )}

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
