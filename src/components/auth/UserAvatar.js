import React, { useState } from "react";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link } from "react-router-dom";

function UserAvatar({ darkMode, setDarkMode, auth, setAuth }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAuth(null);
    handleClose();
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar alt={auth?.username} src={auth?.avatar} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Watchlist</MenuItem>
        <MenuItem onClick={handleClose}>Bids</MenuItem>
        <MenuItem onClick={handleClose}>Purchased</MenuItem>
        <MenuItem onClick={handleClose}>Listings</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem component={Link} to="/create-listing" onClick={handleClose}>
          Create Listing
        </MenuItem>
        <MenuItem onClick={handleDarkModeToggle}>
          {darkMode ? <Brightness7Icon /> : <NightsStayIcon />} Night Mode
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}

export default UserAvatar;
