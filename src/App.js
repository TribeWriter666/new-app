import React from 'react';
import './App.css';
import { Container, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import UserAvatar from './components/auth/UserAvatar';
import LoginDialog from './components/auth/LoginDialog';
import SearchBar from './components/search/SearchBar';
import { CssBaseline, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import ProductCard from './components/products/ProductCard';


function App() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);

  // Add sample product data
  const products = [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description of product 1',
      image: '/path/to/image1.jpg',
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description of product 2',
      image: '/path/to/image2.jpg',
    },
    // Add more product objects here
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
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            pierstreet
          </Typography>
          {!isMobile && (
            <>
              <Button color="inherit">Home</Button>
              <Button color="inherit">Products</Button>
              <Button color="inherit">Contact</Button>
            </>
          )}
          <UserAvatar />
          <Button color="inherit" onClick={handleLoginDialogOpen}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />
      {/* Rest of the app content */}
      <SearchBar />
      <Container>
      <Box
  sx={{
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gridTemplateColumns: 'repeat(3, auto)',
    gridTemplateRows: 'repeat(3, auto)',
    gap: '16px',
  }}
></Box>
<Box sx={{ gridColumn: '2', gridRow: '1' }}>
  <ToggleButtonGroup exclusive>
    <ToggleButton value="fixed">Fixed Price</ToggleButton>
    <ToggleButton value="auction">Auction</ToggleButton>
  </ToggleButtonGroup>
</Box>
<Box sx={{ gridColumn: '1', gridRow: '2' }}>
  <ToggleButtonGroup exclusive>
    <ToggleButton value="buy">Buy</ToggleButton>
    <ToggleButton value="sell">Sell</ToggleButton>
  </ToggleButtonGroup>
</Box>
<Box sx={{ gridColumn: '2', gridRow: '2' }}>
  <SearchBar />
</Box>
<Box sx={{ gridColumn: '3', gridRow: '2' }}>
  <ToggleButtonGroup exclusive>
    <ToggleButton value="new">New</ToggleButton>
    <ToggleButton value="used">Used</ToggleButton>
  </ToggleButtonGroup>
</Box>
<Box sx={{ gridColumn: '1', gridRow: '3' }}>
  <ToggleButtonGroup exclusive>
    <ToggleButton value="local">Local</ToggleButton>
    <ToggleButton value="regional">Regional</ToggleButton>
    <ToggleButton value="international">International</ToggleButton>
  </ToggleButtonGroup>
</Box>
<Box sx={{ gridColumn: '3', gridRow: '3' }}>
  <ToggleButtonGroup exclusive>
    <ToggleButton value="physical">Physical</ToggleButton>
    <ToggleButton value="digital">Digital</ToggleButton>
    <ToggleButton value="both">Both</ToggleButton>
  </ToggleButtonGroup>
</Box>

      </Container>
    </ThemeProvider>
  );
}

export default App;