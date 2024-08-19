import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerDetails from '../components/PlayerDetails';

const PlayerSearch = ({ playerName }) => {
    const [playerId, setPlayerId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayerId = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://apigw.fotmob.com/searchapi/suggest?term=${encodeURIComponent(playerName)}&lang=en`
                );
                const players = response.data.squadMemberSuggest;
                if (players.length > 0) {
                    const firstPlayer = players[0].options[0].payload;
                    setPlayerId(firstPlayer.id);
                } else {
                    setError('Player not found');
                }
            } catch (err) {
                setError('Error fetching player');
            } finally {
                setLoading(false);
            }
        };

        fetchPlayerId();
    }, [playerName]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!playerId) return <div>No player selected</div>;

    return (
        <div>
            <PlayerDetails playerId={playerId} />
        </div>
    );
};

export default PlayerSearch;
