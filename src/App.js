import React from 'react';
import './App.css';
import { Container, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import UserAvatar from './components/auth/UserAvatar';
import LoginDialog from './components/auth/LoginDialog';
import SearchBar from './components/search/SearchBar';
import { CssBaseline } from '@mui/material';

function App() {
  const isMobile = useMediaQuery('(max-width:600px)');
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
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            flexDirection: 'column',
          }}
        >
          <Box className="circular-layout">
            <SearchBar />
            <Box className="button-container top-left">
              <ToggleButtonGroup exclusive>
                <ToggleButton value="new">New</ToggleButton>
                <ToggleButton value="used">Used</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box className="button-container top-right">
              <ToggleButtonGroup exclusive>
                <ToggleButton value="buy">Buy</ToggleButton>
                <ToggleButton value="sell">Sell</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box className="button-container bottom-left">
              <ToggleButtonGroup exclusive>
                <ToggleButton value="local">Local</ToggleButton>
                <ToggleButton value="regional">Regional</ToggleButton>
                <ToggleButton value="international">International</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box className="button-container bottom-right">
              <ToggleButtonGroup exclusive>
                <ToggleButton value="physical">Physical</ToggleButton>
                <ToggleButton value="digital">Digital</ToggleButton>
                <ToggleButton value="both">Both</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
          <Box sx={{ marginTop: '16px' }}>
            <ToggleButtonGroup exclusive>
              <ToggleButton value="fixed">Fixed Price</ToggleButton>
              <ToggleButton value="auction">Auction</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box sx={{ marginTop: '16px' }}>
            <UserAvatar onClick={handleLoginDialogOpen} />
            <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;