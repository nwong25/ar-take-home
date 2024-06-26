import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingSpinner() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress data-testid={'loading-spinner'}/>
    </Box>
  );
}