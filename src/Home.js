import React, { useState } from "react";
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Container,
  CssBaseline,
  Button,
} from "@mui/material";
import SearchBar from "./components/search/SearchBar";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import UserAvatar from "./components/auth/UserAvatar";
import LoginDialog from "./components/auth/LoginDialog";
import RegisterDialog from "./components/auth/RegisterDialog";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

function HomePage({ darkMode, setDarkMode, auth, setAuth }) {
  const [purchaseState, setPurchaseState] = useState(null);
  const [locationState, setLocationState] = useState(null);
  const [physicalDigital, setPhysicalDigital] = useState(null);
  const [fixedAuction, setFixedAuction] = useState(null);
  const [newUsed, setNewUsed] = useState(null);
  const navigate = useNavigate();
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const user = supabase.auth.user;

  const handlePurchaseChange = (event, newValue) => {
    setPurchaseState(newValue);
  };

  const handleLocationChange = (event, newValue) => {
    setLocationState(newValue);
  };

  const handleLoginDialogOpen = () => {
    setLoginDialogOpen(true);
  };

  const handleRegisterDialogOpen = () => {
    setRegisterDialogOpen(true);
  };

  const handleSearchSubmit = (query) => {
    navigate(`/search/${query}`);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "var(--bg-color)",
          },
        },
      },
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
                <SearchBar
                  onSubmit={(event) => {
                    handleSearchSubmit(event);
                  }}
                />
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
              <Grid
                item
                xs={12}
                sx={{ position: "absolute", top: 8, right: 16 }}
              >
                {!user ? (
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
                  <UserAvatar
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    user={user}
                  />
                )}
                <LoginDialog
                  open={loginDialogOpen}
                  onClose={() => setLoginDialogOpen(false)}
                />

                <RegisterDialog
                  open={registerDialogOpen}
                  onClose={() => setRegisterDialogOpen(false)}
                />
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
                  <SearchBar
                    onSubmit={(event) => {
                      handleSearchSubmit(event);
                    }}
                  />

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
                {!user ? (
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
                  <UserAvatar
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    user={user}
                  />
                )}
                <LoginDialog
                  open={loginDialogOpen}
                  onClose={() => setLoginDialogOpen(false)}
                />

                <RegisterDialog
                  open={registerDialogOpen}
                  onClose={() => setRegisterDialogOpen(false)}
                />
              </Box>
            </>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default HomePage;
