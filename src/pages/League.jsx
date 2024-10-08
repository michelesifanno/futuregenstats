import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BestLeaguePlayers from '../components/League/BestLeaguePlayers';

// Funzione per determinare il colore in base al punteggio di talento del giocatore
const getTalentScoreColor = (score) => {
  if (score > 100) return '#C78E34';
  if (score > 80) return '#C73473';
  if (score > 60) return '#33C771';
  if (score > 40) return '#3482C7';
  if (score > 20) return '#C76434';
  return '#C73434'; // Colore predefinito se il punteggio <= 20
};

export default function League() {
  const theme = useTheme();
  const { slug } = useParams();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{
      background: theme.palette.secondary.main,
      padding: isMobile ? '70px 10px 10px 10px' : '100px 80px 20px 80px',
      minHeight: '100vh',
    }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
            <BestLeaguePlayers
              competitionId={slug}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
