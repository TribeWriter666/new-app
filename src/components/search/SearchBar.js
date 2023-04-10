import React, { useState } from "react";
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

function SearchBar({ onSubmit }) {
  const [searchInput, setSearchInput] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSubmit = (e) => {
    //   e.preventDefault();
    console.log(e);
    onSubmit(searchInput);
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <StyledPaper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: isMobile ? "100%" : "75%",
      }}
    >
      <StyledInputBase
        value={searchInput}
        onChange={handleChange}
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
