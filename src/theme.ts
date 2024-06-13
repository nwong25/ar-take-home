'use client';
import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';


const theme = createTheme({
  palette: {
    primary: {
      main: '#3C7C5F',
      dark: '#2e624d',
      light: '#63967f'
    },
    secondary: {
      main: '#8c4361',
      dark: '#622e43',
      light: '#a36880'
    }
  },
  components: {
    // Use `MuiDataGrid` on DataGrid, DataGridPro and DataGridPremium
    MuiDataGrid: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

export default theme;