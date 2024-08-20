import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
} from '@mui/material';

const PlayerProfile = ({ playerData }) => {
  if (!playerData) {
    return <Typography color="error">Nessun dato disponibile</Typography>;
  }

  const { name, birthDate, primaryTeam, positionDescription, playerInformation, statsSection, recentMatches } = playerData;

  // Extract relevant information from playerInformation
  const height = playerInformation.find(info => info.title === 'Height')?.fallback;
  const shirtNumber = playerInformation.find(info => info.title === 'Shirt')?.fallback;
  const age = playerInformation.find(info => info.title === 'Age')?.fallback;
  const preferredFoot = playerInformation.find(info => info.title === 'Preferred foot')?.fallback;
  const country = playerInformation.find(info => info.title === 'Country')?.fallback;
  const marketValue = playerInformation.find(info => info.title === 'Market value')?.fallback;

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {name} - #{shirtNumber}
        </Typography>

        <Typography variant="h6">Informazioni di base</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography><strong>Squadra:</strong> {primaryTeam.teamName}</Typography>
            <Typography><strong>Posizione:</strong> {positionDescription.positions[0].label}</Typography>
            <Typography><strong>Nazionalità:</strong> {country}</Typography>
            <Typography><strong>Piede preferito:</strong> {preferredFoot}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Età:</strong> {age}</Typography>
            <Typography><strong>Altezza:</strong> {height}</Typography>
            <Typography><strong>Valore di mercato:</strong> {marketValue}</Typography>
            <Typography><strong>Data di nascita:</strong> {new Date(birthDate.utcTime).toLocaleDateString()}</Typography>
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
          Statistiche dettagliate di stagione
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {statsSection.items.map((statGroup, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell colSpan={2} style={{ backgroundColor: '#f0f0f0' }}>
                      <Typography variant="subtitle1"><strong>{statGroup.title}</strong></Typography>
                    </TableCell>
                  </TableRow>
                  {statGroup.items.map((stat, subIndex) => (
                    <TableRow key={subIndex}>
                      <TableCell>{stat.title}</TableCell>
                      <TableCell>{stat.statValue}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
          Partite recenti
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {recentMatches.map((match, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(match.matchDate.utcTime).toLocaleDateString()}</TableCell>
                  <TableCell>{match.teamName} vs {match.opponentTeamName}</TableCell>
                  <TableCell>{match.homeScore} - {match.awayScore}</TableCell>
                  <TableCell>{match.minutesPlayed} min</TableCell>
                  <TableCell>Voto: {match.ratingProps?.num || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default PlayerProfile;
