import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { usePlayers } from '../utils/usePlayers';

// Definizione delle colonne con la classe CSS personalizzata per le intestazioni
const columns = [
  {
    field: 'image',
    headerName: 'Player',
    width: 100,
    renderCell: (params) => (
      <img
        src={params.value}
        alt={params.row.name}
        style={{ width: '40px', borderRadius: '5px' }}
      />
    ),
    sortable: false,
    filterable: false,
    headerClassName: 'header-row', // Classe CSS personalizzata per l'intestazione
  },
  {
    field: 'name',
    headerName: 'Nome',
    flex: 2,
    minWidth: 200,
    renderCell: (params) => (
      <Link to={`/player/${params.row.id}`} style={{ textDecoration: 'none', color: '#333' }}>
        <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
          {params.value}
        </Typography>
      </Link>
    ),
    headerClassName: 'header-row', // Classe CSS personalizzata per l'intestazione
  },
  {
    field: 'positions',
    headerName: 'Ruolo',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <Typography sx={{ fontWeight: 500, fontSize: '12px' }}>
        {params.value}
      </Typography>
    ),
    headerClassName: 'header-row', // Classe CSS personalizzata per l'intestazione
  },
  {
    field: 'marketvalue',
    headerName: 'Valore',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <Typography sx={{ fontWeight: 500, fontSize: '12px' }}>
        {params.row.marketvalueFormatted}
      </Typography>
    ),
    valueFormatter: (params) => {
      // Usa params.value per il valore numerico
      return formatMarketValue(params.value);
    },
    headerClassName: 'header-row', // Classe CSS personalizzata per l'intestazione
  },
  {
    field: 'club',
    headerName: 'Club',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={params.value.image}
          alt={params.value.name}
          style={{ width: '40px', marginRight: '10px' }}
        />
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: '10px',
            textAlign: 'left',
            color: '#333',
            textTransform: 'uppercase',
          }}
        >
          {params.value.name}
        </Typography>
      </div>
    ),
    headerClassName: 'header-row', // Classe CSS personalizzata per l'intestazione
  },
  {
    field: 'stats',
    headerName: 'Stats',
    width: 150,
    renderCell: (params) => (
      <Link to={`/player/${params.row.id}`} style={{ textDecoration: 'none' }}>
        <Button color="primary">
          Scopri di più
        </Button>
      </Link>
    ),
    headerClassName: 'header-row', // Classe CSS personalizzata per l'intestazione
  },
];

// Funzione per formattare il valore di mercato
const formatMarketValue = (value) => {
  if (!value) return 'N/A';
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return 'N/A';
  return `${(numericValue / 1000000).toFixed(1)} mil.`;
};

export default function PlayerTable({ ageCategory }) {
  const { players, loading, error } = usePlayers(ageCategory);

  return (
    <Box
      sx={{
        height: 800,
        width: '100%',
        '& .header-row': {
          backgroundColor: '#f8f8f8!important', // Cambia questo colore come desideri
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#333',
          padding: '18px!important',
          border: 'none!important',
        },
        '& .custom-row': {
          padding: '10px!important',
          borderTop: '1px solid #eee!important',
      },
      }}
    >
  <DataGrid
    rows={players}
    columns={columns}
    pageSize={10}
    rowsPerPageOptions={[5, 10, 20]}
    disableSelectionOnClick
    getRowClassName={() => 'custom-row'} // Applica la classe CSS personalizzata alle righe
  />
    </Box >
  );
}
