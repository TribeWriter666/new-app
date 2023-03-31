import React from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  borderRadius: "50px",
  width: "75%",
  maxWidth: "1000px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const StyledInputBase = styled(InputBase)({
  marginLeft: "8px",
  flex: 1,
});

const StyledIconButton = styled(IconButton)({
  padding: "10px",
});

function SearchBar() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <StyledPaper
      component="form"
      sx={{
        width: isMobile ? "100%" : "75%",
      }}
    >
      <StyledInputBase
        placeholder="Search Products"
        inputProps={{ "aria-label": "search products" }}
      />
      <StyledIconButton type="submit" aria-label="search">
        <SearchIcon />
      </StyledIconButton>
    </StyledPaper>
  );
}

export default SearchBar;
