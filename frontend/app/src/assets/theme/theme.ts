import { createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6d8e46',
      light: '#ECE4DC',
      dark: '#5a9216'
    }
  },
  typography: {
    subtitle2: {
      fontSize: 20,
      color: 'black',
      background: 'linear-gradient(transparent 60%, #C8E0BD 30%)',
      fontWeight: 'bold',
      margin: 10
    },
    h6: {
      fontSize: '1rem',
      '@media (min-width:600px)': {
        fontSize: '1.2rem'
      }
    }
  }
})
