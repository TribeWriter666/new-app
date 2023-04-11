// AddProductForm.js
import React, { useState } from "react";
import { Button, TextField, Grid, Box } from "@mui/material";

function AddProductForm({ onAddProduct }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct({ title, description, image });
    setTitle("");
    setDescription("");
    setImage("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add Product
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddProductForm;
