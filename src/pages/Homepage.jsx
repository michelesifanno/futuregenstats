import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import supabase from '../supabase/client';
import { useTheme } from '@emotion/react';

function Homepage() {
    const theme = useTheme();
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                let { data, error } = await supabase
                    .from('players')
                    .select('*');
                if (error) throw error;
                setPlayers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Box sx={{ flexGrow: 1, width: '100%', background: theme.palette.secondary.main, padding: '140px 40px' }}>
            <Typography variant="h2" gutterBottom>
                Player Directory
            </Typography>
            <Grid container spacing={2}>
                {players.map((player) => (
                    <Grid item xs={12} sm={6} md={4} key={player.id}>
                        <Box sx={{ margin: 1 }}>
                            <Paper elevation={3} sx={{ padding: 2 }}>
                                <Typography variant="h6">{player.name}</Typography>
                                <Typography variant="body1"><strong>Position:</strong> {player.position}</Typography>
                                <Typography variant="body1"><strong>Nationality:</strong> {player.nationality}</Typography>
                                <Typography variant="body1"><strong>Date of Birth:</strong> {new Date(player.dateofbirth).toLocaleDateString()}</Typography>
                                <Typography variant="body1"><strong>Team:</strong> {player.team}</Typography>
                                <Typography variant="body1"><strong>Competition:</strong> {player.competition}</Typography>
                            </Paper>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Homepage;