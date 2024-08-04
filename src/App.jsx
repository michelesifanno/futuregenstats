import { useState, useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import supabase from './supabase/client';
import theme from './template/theme';

function App() {
  const [count, setCount] = useState(0);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      let { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('nationality', 'Italy'); // Adding the filter for nationality
        
      if (error) {
        setError(error);
      } else {
        setPlayers(data);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ background: 'blue', padding: 2 }}>
        <img src="/logo.png" className="logo" alt="Vite logo" width="15%" />
        <Typography variant="h4" color="white">
          KITEMMUUU
        </Typography>
        {error && <Typography color="red">Error fetching data: {error.message}</Typography>}
        <Box sx={{ marginTop: 2 }}>
          {players.map((player) => (
            <Typography key={player.id} color="white">
              {player.name}
            </Typography>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;