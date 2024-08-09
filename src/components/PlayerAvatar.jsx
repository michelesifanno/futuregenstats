import React from 'react';
import { Avatar as MuiAvatar, Typography } from '@mui/material';

export default function PlayerAvatar({ position }) {
  // Funzione per determinare il colore e l'acronimo
  const getAvatarDetails = (position) => {
    const positionLower = position.toLowerCase();

    if (positionLower.includes('goalkeeper')) {
      return { color: '#FFA500', acronym: 'GK' }; // Arancione per i portieri
    } else if (positionLower.includes('centre-back') || positionLower.includes('center-back') || 
               positionLower.includes('defender') || positionLower.includes('right-back') || 
               positionLower.includes('left-back') || positionLower.includes('back')) {
      return { color: '#007bff', acronym: 'DF' }; // Azzurro per i difensori
    } else if (positionLower.includes('midfielder') || positionLower.includes('midfield') || 
               positionLower.includes('central midfield') || positionLower.includes('winger') ||
               positionLower.includes('left wing') || positionLower.includes('right wing') ||
               positionLower.includes('attacking midfield') || positionLower.includes('defensive midfield')) {
      return { color: '#28a745', acronym: 'MF' }; // Verde per i centrocampisti
    } else if (positionLower.includes('forward') || positionLower.includes('striker') || 
               positionLower.includes('attacker') || positionLower.includes('winger') || positionLower.includes('offence')) {
      return { color: '#dc3545', acronym: 'FW' }; // Rosso per gli attaccanti
    } else {
      return { color: '#6c757d', acronym: 'OTH' }; // Grigio per ruoli non specificati
    }
  };

  // Ottieni il colore e l'acronimo basati sulla posizione
  const { color, acronym } = getAvatarDetails(position);

  return (
    <MuiAvatar sx={{ backgroundColor: color, width: 30, height: 30 }}>
      <Typography sx={{fontSize:'12px', fontWeight:'500'}}>
      {acronym}
      </Typography>   
    </MuiAvatar>
  );
}