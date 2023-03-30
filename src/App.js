import React from "react";
import "./App.css";
import {
  Container,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  CssBaseline,
  Button,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import UserAvatar from "./components/auth/UserAvatar";
import LoginDialog from "./components/auth/LoginDialog";
import SearchBar from "./components/search/SearchBar";
import { useState } from "react";

function App() {
  const [typeState, setTypeState] = useState(null);
  const [conditionState, setConditionState] = useState(null);
  const [purchaseState, setPurchaseState] = useState(null);
  const [locationState, setLocationState] = useState(null);
  const [formatState, setFormatState] = useState(null);
  const [physicalDigital, setPhysicalDigital] = useState("physical");
  const [fixedAuction, setFixedAuction] = useState("fixed");
  const [newUsed, setNewUsed] = useState(null);

  const handleTypeChange = (event, newValue) => {
    setTypeState(newValue);
  };

  const handleConditionChange = (event, newValue) => {
    setConditionState(newValue);
  };

  const handlePurchaseChange = (event, newValue) => {
    setPurchaseState(newValue);
  };

  const handleLocationChange = (event, newValue) => {
    setLocationState(newValue);
  };

  const handleFormatChange = (event, newValue) => {
    setFormatState(newValue);
  };

  const isMobile = useMediaQuery("(max-width:600px)");
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);

  // Add sample product data
  const products = [
    // ... your product objects
  ];

  const handleLoginDialogOpen = () => {
    setLoginDialogOpen(true);
  };

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            flexDirection: "column",
          }}
        >
          <Box className="local-regional-international">
            <ToggleButtonGroup
              exclusive
              value={locationState}
              onChange={handleLocationChange}
            >
              <ToggleButton value="local">Local</ToggleButton>
              <ToggleButton value="regional">Regional</ToggleButton>
              <ToggleButton value="international">International</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box className="button-container">
              <ToggleButtonGroup
                className="fixed-price-auction"
                exclusive
                value={fixedAuction}
                onChange={(e, val) => setFixedAuction(val)}
              >
                <ToggleButton value="fixed">Fixed Price</ToggleButton>
                <ToggleButton value="auction">Auction</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box className="button-row">
              <Box className="button-container new-used-both">
                <ToggleButtonGroup
                  className="new-used"
                  value={newUsed}
                  exclusive
                  onChange={(e, val) => setNewUsed(val)}
                >
                  <ToggleButton value="new">New</ToggleButton>
                  <ToggleButton value="used">Used</ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <SearchBar />
              <Box className="button-container buy-sell">
                <ToggleButtonGroup
                  exclusive
                  value={purchaseState}
                  onChange={handlePurchaseChange}
                >
                  <ToggleButton value="buy">Buy</ToggleButton>
                  <ToggleButton value="sell">Sell</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
            <Box className="button-container">
              <ToggleButtonGroup
                className="physical-digital"
                value={physicalDigital}
                onChange={(e, val) => setPhysicalDigital(val)}
              >
                <ToggleButton value="physical">Physical</ToggleButton>
                <ToggleButton value="digital">Digital</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
          <Box className="login-button">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleLoginDialogOpen}
            >
              Login
            </Button>
            <UserAvatar onClick={handleLoginDialogOpen} />
            <LoginDialog
              open={loginDialogOpen}
              onClose={handleLoginDialogClose}
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
