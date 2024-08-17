import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2047e4',  // Colore principale
    },
    secondary: {
      main: '#ff6f61',  // Colore secondario
    },
    third: {
      main: '#2c3ec4',
    },
    background: {
      default: '#f5f5f5',  // Colore di sfondo chiaro
      paper: '#ffffff',  // Colore di sfondo dei componenti
    },
    text: {
      primary: '#333333',  // Colore del testo primario scuro
      secondary: '#666666',  // Colore del testo secondario più chiaro
    },
    error: {
      main: '#d32f2f',  // Colore di errore
    },
    warning: {
      main: '#ffa726',  // Colore di avviso
    },
    info: {
      main: '#29b6f6',  // Colore di informazione
    },
    success: {
      main: '#66bb6a',  // Colore di successo
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: 'rgba(32, 71, 228, 0.1)',  // Colore di sfondo al passaggio del mouse
          borderColor: '#0033cc',  // Colore del bordo al passaggio del mouse
          color: '#ffffff',  // Colore del testo per il bottone contenuto
          '&:hover': {
            backgroundColor: 'rgba(32, 71, 228, 0.1)',  // Colore di sfondo al passaggio del mouse
          },
        },
        outlined: {
          borderColor: '#2047e4',  // Colore del bordo per il bottone outline
          color: '#eee',  // Colore del testo per il bottone outline
          '&:hover': {
            borderColor: '#0033cc',  // Colore del bordo al passaggio del mouse
            backgroundColor: 'rgba(32, 71, 228, 0.1)',  // Colore di sfondo al passaggio del mouse
          },
        },
      },
    },
  },
});

export default theme;
