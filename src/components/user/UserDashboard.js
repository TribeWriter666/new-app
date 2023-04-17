import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import ProductCard from "../products/ProductCard";
import axios from "axios";

function UserDashboard({ auth }) {
  const [listings, setListings] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const listingsResponse = await axios.get(
          `http://localhost:3001/listings/${auth.userId}`
        );
        const purchasesResponse = await axios.get(
          `http://localhost:3001/purchases/${auth.userId}`
        );
        setListings(listingsResponse.data);
        setPurchases(purchasesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error.response.data.message);
      }
    }
    if (auth) {
      fetchData();
    }
  }, [auth]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Your Listings
      </Typography>
      <Grid container spacing={2}>
        {listings.map((listing) => (
          <Grid key={listing._id} item xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={listing} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h4" sx={{ marginTop: 4, marginBottom: 2 }}>
        Your Purchases
      </Typography>
      <Grid container spacing={2}>
        {purchases.map((purchase) => (
          <Grid key={purchase._id} item xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={purchase} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default UserDashboard;
