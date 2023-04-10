// ProductList.js
import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

function ProductList({ products, view }) {
  const gridProps = {
    smallGrid: { xs: 12, sm: 6, md: 4 },
    largeGrid: { xs: 12, sm: 12, md: 6 },
    list: { xs: 12, sm: 12, md: 12 },
  };

  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item key={product.id} {...gridProps[view]}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
