import React from 'react';
import useTopCompetitions from '../utils/useTopCompetitions'; // Assicurati che questo percorso sia corretto
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, useMediaQuery } from '@mui/material';

const logoMap = {
  'Premier League': 'competitions/col-premier-league.png',
  'Serie A': 'competitions/col-serie-a.png',
  'Bundesliga': 'competitions/col-bundesliga.png',
  'La Liga': 'competitions/col-la-liga.png',
  'Ligue 1': 'competitions/col-ligue-1.png',
  'Brasileirão': 'competitions/col-brasilerao.png',
  'Primeira Liga': 'competitions/col-primeira-liga.png',
  'Eredivisie': 'competitions/col-eredivise.png',
};

const TopCompetitions = ({ filter }) => {
  const { competitions, loading, error } = useTopCompetitions(filter);


  if (loading) return <p>Caricamento in corso...</p>;
  if (error) return <p>Errore: {error}</p>;

  // Ordinamento e limitazione dei risultati
  const sortedCompetitions = [...competitions].sort((a, b) => {
    // Usa `a.sum` o `a.avg` a seconda del filtro selezionato
    const aValue = filter === 'avg_market_value' ? a.avg : a.sum;
    const bValue = filter === 'avg_market_value' ? b.avg : b.sum;

    return Number(bValue) - Number(aValue);
  }).slice(0, 5);

  // Funzione di rendering dell'etichetta del filtro
  const renderFilterLabel = () => {
    switch (filter) {
      case 'num_players':
        return 'Numero di Giocatori';
      case 'total_goals':
        return 'Totale Goal';
      case 'total_assists':
        return 'Totale Assist';
      case 'total_matches':
        return 'Totale Partite';
      case 'avg_market_value':
        return 'Valore di Mercato Medio';
      default:
        return 'Valore';
    }
  };

    // Funzione per ottenere la descrizione del filtro da visualizzare accanto al valore
    const getFilterDescription = () => {
      switch (filter) {
        case 'num_players':
          return 'giocatori';
        case 'total_goals':
          return 'goal';
        case 'total_assists':
          return 'assist';
        case 'total_matches':
          return 'partite';
        case 'avg_market_value':
          return '€'; // € viene già aggiunto direttamente davanti al valore
        default:
          return '';
      }
    };
  

  return (
    <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
      <Table>
        <TableBody>
          {sortedCompetitions.map((comp, index) => (
            <TableRow key={index}>
              <TableCell>
                <img src={logoMap[comp.competition]} alt={comp.Brasileirãocompetition} width="35px" height="35px" />
              </TableCell>
              <TableCell>
                <Typography sx={{ textTransform: 'uppercase', fontWeight: 500, fontSize: '14px' }}>
                  {comp.competition}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, textAlign:'right' }}>
                  {filter === 'avg_market_value' ? `€${comp.avg.toFixed(2)}` : `${comp.sum}`}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopCompetitions;
