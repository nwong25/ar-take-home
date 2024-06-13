import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import locale from '@/app/lib/locale';
import Container from '@mui/material/Container';

export default function ErrorMessage () {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          paddingLeft: 2,
          paddingRight: 2
        }}
      >
        <Typography component="h1" variant="h5" align="center">
          {locale.ERROR}
        </Typography>
      </Box>
    </Container>
  )
}