// src/components/listings/CreateListing.js
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import supabase from "../../supabaseClient";

function CreateListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Interact with the server to create a new listing
    const { data, error } = await supabase.from("listings").insert([
      {
        title,
        description,
        price,
        category,
      },
    ]);

    if (error) {
      console.error("Error creating listing:", error.message);
    } else {
      console.log("Listing created:", data);
      // Clear form fields after submission
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "400px",
        margin: "auto",
        padding: 2,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Create Listing
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={4}
        required
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      />
      <FormControl fullWidth required sx={{ marginBottom: 2 }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {/* Add your categories here */}
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="clothing">Clothing</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
    </Box>
  );
}

export default CreateListing;
