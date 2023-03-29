import React from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

function SearchBar() {
  return (
    <Paper
      component="form"
      sx={{
        p: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50px',
        width: '100%',
        maxWidth: '600px',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Products"
        inputProps={{ 'aria-label': 'search products' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
