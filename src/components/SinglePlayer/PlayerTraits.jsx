import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  useMediaQuery,
  Paper
} from '@mui/material';
import { useTheme } from '@emotion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Componente PlayerTraits
export default function PlayerTraits({ traits }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [playerInfoMap, setPlayerInfoMap] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    // Imposta un timeout per mostrare un messaggio di errore se i dati non sono caricati in 5 secondi
    const timer = setTimeout(() => {
      if (loading) {
        setTimedOut(true);
        setLoading(false); // Ferma il circular progress
      }
    }, 5000);

    if (traits?.items) {
      const map = new Map(traits.items.map(item => [item.key, item.value]));
      setPlayerInfoMap(map);
      setLoading(false);
      clearTimeout(timer); // Cancella il timeout se i dati vengono caricati in tempo
    } else {
      setLoading(true); // I dati non sono disponibili
    }

    return () => clearTimeout(timer); // Pulizia del timeout se il componente si smonta
  }, [traits]);

  // Trova il valore massimo per normalizzare i dati
  const maxValue = Math.max(...(traits?.items || []).map(d => d.value), 1);

  // Icone per ogni tipo di dato
  const icons = {
    chances_created: '✨',
    aerials_won: '✈️',
    defensive_actions: '🛡️',
    goals: '⚽️',
    shot_attempts: '🥅',
    touches: '🦶🏻',
  };

  return (
    <>
      {loading ? (
        timedOut ? (
          <Typography sx={{ textAlign: 'center', color: 'red' }}>Dati non disponibili</Typography>
        ) : (
          <CircularProgress />
        )
      ) : (
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#171d8d' }} />}
            aria-controls="current-stats"
            id="current-stats"
          >
            <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
              Player Traits
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ fontWeight: 400, fontSize: '12px', padding:'0px 0px' }}>
              {traits.title}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {traits.items.map((item) => {
                    // Normalizzazione dei dati per adattarli all'area della barra di progresso
                    const normalizedValue = (item.value / maxValue) * 100;
                    return (
                      <TableRow key={item.key} style={{fontSize:'14px!important'}}>
                        <TableCell sx={{paddingLeft:'0px!important'}}>
                            <Typography sx={{ marginLeft: '8px', fontWeight: 500, fontSize:isMobile ? '12px' : '14px'}}>
                            {icons[item.key]} {item.title}
                            </Typography>
                        </TableCell>
                        <TableCell sx={{paddingRight:'0px!important'}}>
                            <LinearProgress
                              variant="determinate"
                              value={normalizedValue}
                              sx={{ height: 10, borderRadius: '2px', backgroundColor: '#e0e0e0' }}
                            />
                            <Typography sx={{ marginTop: '8px', textAlign: 'right', color: '#171D8D', fontSize:'10px' }}>
                              {item.value.toFixed(2)} <b>({normalizedValue.toFixed(0)}%)</b>
                            </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
}