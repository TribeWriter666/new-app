import React, { useState, useEffect } from "react";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import SearchBar from "./components/search/SearchBar";
import ProductList from "./components/products/ProductList";
import UserAvatar from "./components/auth/UserAvatar";
import { useParams } from "react-router-dom";

function ProductUI({ searchQuery }) {
  const [products] = useState([]);
  const [view, setView] = useState("smallGrid");
  const { query } = useParams();

  // Rest of the App component

  function handleSearchSubmit(query) {
    console.log(query);
    // Implement actual search logic here
    // For now, set mock products data
    // ...more products
  }

  useEffect(() => {
    handleSearchSubmit(query);
  }, [query]);

  function handleViewChange(event, newView) {
    if (newView !== null) {
      setView(newView);
    }
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <SearchBar onSubmit={handleSearchSubmit} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="view"
          >
            <ToggleButton value="smallGrid" aria-label="small grid view">
              {/* Add small grid icon here */}
            </ToggleButton>
            <ToggleButton value="largeGrid" aria-label="large grid view">
              {/* Add large grid icon here */}
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              {/* Add list view icon here */}
            </ToggleButton>
          </ToggleButtonGroup>
          <UserAvatar />
        </Toolbar>
      </AppBar>
      <Box mt={2}>
        <ProductList products={products} view={view} />
      </Box>
    </Box>
  );
}

export default ProductUI;
