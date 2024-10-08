// League.js
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLeaguePlayersScoreAndTrends } from '../utils/useLeaguePlayersScoreAndTrends';
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
  const  slug  = useParams();

  const { players, loading: playersLoading, error: playersError } = useLeaguePlayersScoreAndTrends(slug);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (playersError) {
    console.error("Errore nel recupero dei giocatori:", playersError);
    return <Typography color="error">{playersError}</Typography>;
  }

  return (
    <Box>
      <BestLeaguePlayers players={players} loading={playersLoading} />
    </Box>
  );
}
