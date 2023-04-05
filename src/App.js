import React from "react";
import "./App.css";
import {
  Container,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  CssBaseline,
  Button,
  Grid,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import UserAvatar from "./components/auth/UserAvatar";
import LoginDialog from "./components/auth/LoginDialog";
import SearchBar from "./components/search/SearchBar";
import { useState } from "react";
import RegisterDialog from "./components/auth/RegisterDialog";
import { useEffect } from "react";

function App() {
  const [purchaseState, setPurchaseState] = useState(null);
  const [locationState, setLocationState] = useState(null);
  const [physicalDigital, setPhysicalDigital] = useState(null);
  const [fixedAuction, setFixedAuction] = useState(null);
  const [newUsed, setNewUsed] = useState(null);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const [auth, setAuth] = useState(null);

  const handleLoginDialogOpen = () => {
    setLoginDialogOpen(true);
  };

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
  };

  const handleRegisterDialogOpen = () => {
    setRegisterDialogOpen(true);
  };

  const handleRegisterDialogClose = () => {
    setRegisterDialogOpen(false);
  };

  const handlePurchaseChange = (event, newValue) => {
    setPurchaseState(newValue);
  };

  const handleLocationChange = (event, newValue) => {
    setLocationState(newValue);
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            maxHeight: "100vh",
            overflow: "auto", // Add overflow property
            flexDirection: "column",
          }}
        >
          {isMobile ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <Box className="button-container">
                  <ToggleButtonGroup
                    className="fixed-price-auction"
                    value={fixedAuction}
                    onChange={(e, val) => setFixedAuction(val)}
                  >
                    <ToggleButton value="fixed">Fixed Price</ToggleButton>
                    <ToggleButton value="auction">Auction</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <SearchBar />
              </Grid>
              <Grid item xs={12}>
                <Box className="button-container">
                  <ToggleButtonGroup
                    className="physical-digital"
                    value={physicalDigital}
                    onChange={(e, val) => {
                      console.log("physicalDigital:", val);
                      setPhysicalDigital(val);
                    }}
                  >
                    <ToggleButton value="physical">Physical</ToggleButton>
                    <ToggleButton value="digital">Digital</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="button-container new-used-both">
                  <ToggleButtonGroup
                    className="new-used"
                    value={newUsed}
                    onChange={(e, val) => setNewUsed(val)}
                  >
                    <ToggleButton value="new">New</ToggleButton>
                    <ToggleButton value="used">Used</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="login-button" sx={{ textAlign: "center" }}>
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
              </Grid>
              <Grid item xs={12} sx={{ position: "absolute", bottom: 16 }}>
                <Box className="local-regional-international">
                  <ToggleButtonGroup
                    exclusive
                    value={locationState}
                    onChange={handleLocationChange}
                  >
                    <ToggleButton value="local">Local</ToggleButton>
                    <ToggleButton value="regional">Regional</ToggleButton>
                    <ToggleButton value="international">
                      International
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <>
              <Box className="local-regional-international">
                <ToggleButtonGroup
                  exclusive
                  value={locationState}
                  onChange={handleLocationChange}
                >
                  <ToggleButton value="local">Local</ToggleButton>
                  <ToggleButton value="regional">Regional</ToggleButton>
                  <ToggleButton value="international">
                    International
                  </ToggleButton>
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
                    onChange={(e, val) => {
                      console.log("physicalDigital:", val);
                      setPhysicalDigital(val);
                    }}
                  >
                    <ToggleButton value="physical">Physical</ToggleButton>
                    <ToggleButton value="digital">Digital</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 16,
                }}
              >
                {!auth ? (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleLoginDialogOpen}
                    >
                      Login
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleRegisterDialogOpen}
                    >
                      Register
                    </Button>
                  </>
                ) : (
                  <UserAvatar auth={auth} setAuth={setAuth} />
                )}
                <LoginDialog
                  open={loginDialogOpen}
                  onClose={handleLoginDialogClose}
                  setAuth={setAuth}
                />
                <RegisterDialog
                  open={registerDialogOpen}
                  onClose={handleRegisterDialogClose}
                  setAuth={setAuth}
                />
              </Box>
            </>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
