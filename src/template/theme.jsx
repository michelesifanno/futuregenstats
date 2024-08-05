// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2047e4',  // Il colore che hai fornito
    },
    secondary: {
      main: '#ff6f61',  // Colore complementare ispirato a Sofascore
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
});

export default theme;