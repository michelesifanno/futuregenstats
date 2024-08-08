import React from 'react';
import usePlayers from '../utils/usePlayers';
import Avatar from '../components/Avatar';
import Flag from '../components/Flag'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PlayerAvatar from './PlayerAvatar';
import { Typography } from '@mui/material';

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

// Helper function
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const PlayersTable = ({ filter }) => {
  const { players, error } = usePlayers(filter);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
      <Table>
        <TableBody>
          {players.map(player => (
            <TableRow key={player.id}>
              <TableCell>
                <Avatar name={player.name} />
              </TableCell>
              <TableCell>
                <Typography sx={{textTransform:'uppercase', fontWeight:500, fontSize:'14px'}}>{player.name}</Typography>
                <Typography sx={{fontWeight:400, fontSize:'12px'}}>{player.team}</Typography>
              </TableCell>
              <TableCell>
              <PlayerAvatar position={player.position} />
              </TableCell>
              <TableCell><Flag nationality={player.nationality} /></TableCell>
              <TableCell>
              <img src={logoMap[player.competition]} alt={player.competition} width="30px"/>
                </TableCell>
              <TableCell><Typography sx={{textTransform:'uppercase', fontSize:'14px', textAlign:'right'}}><strong>{player[filter] !== undefined ? player[filter] : 'N/A'}</strong> {capitalizeFirstLetter(filter)}</Typography></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


export default function TopPlayers({ filter }) {
  return (
    <div>
      <PlayersTable filter={filter} />
    </div>
  );
}
