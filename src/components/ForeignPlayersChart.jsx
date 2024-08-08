import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Card, CardContent, Typography } from '@mui/material';
import useForeignPlayersData from '../utils/useForeignPlayersData';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Registra i componenti necessari di Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const ForeignPlayersChart = () => {
  const { data, loading, error } = useForeignPlayersData();

  if (loading) return <p>Caricamento in corso...</p>;
  if (error) return <p>Errore: {error}</p>;

  const chartData = {
    labels: data.map((comp) => comp.competition),
    datasets: [
      {
        label: 'Giocatori Stranieri',
        data: data.map((comp) => comp.foreign),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Giocatori Nazionali',
        data: data.map((comp) => comp.local),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: '% Stranieri',
        data: data.map((comp) => comp.foreignPercentage),
        type: 'line', // Usa una linea per mostrare la percentuale
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'percentageAxis', // Asse Y separato per la percentuale
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Giocatori Stranieri e Nazionali per Competizione',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Numero di Giocatori',
        },
      },
      percentageAxis: {
        position: 'right',
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`,
        },
        title: {
          display: true,
          text: 'Percentuale Stranieri',
        },
      },
    },
  };

  return (
    <Card sx={{ maxWidth: '100%', margin: '20px 0' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Giocatori Stranieri e Nazionali per Competizione</Typography>
        <Box sx={{ height: '400px' }}>
          <Bar data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ForeignPlayersChart;
