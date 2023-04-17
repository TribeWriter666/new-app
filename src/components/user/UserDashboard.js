import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import ProductCard from "../products/ProductCard";
import supabase from "../supabase";

function UserDashboard({ auth }) {
  const [listings, setListings] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: listingsData, error: listingsError } = await supabase
          .from("listings")
          .select("*")
          .eq("user_id", auth.id);

        const { data: purchasesData, error: purchasesError } = await supabase
          .from("purchases")
          .select("*")
          .eq("user_id", auth.id);

        if (listingsError) throw listingsError;
        if (purchasesError) throw purchasesError;

        setListings(listingsData);
        setPurchases(purchasesData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
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
