// hooks/usePlayerId.js
import { useState, useEffect } from 'react';
import axios from 'axios';

// Funzione per calcolare la similarità tra due nomi basata sul numero di parole in comune
const getCommonWordCount = (name1, name2) => {
    const words1 = name1.toLowerCase().split(/\s+/);
    const words2 = name2.toLowerCase().split(/\s+/);
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length;
};

const usePlayerId = (playerName, clubName) => {
    const [playerId, setPlayerId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!playerName) return;

        const fetchPlayerId = async () => {
            setLoading(true);
            console.log(`Fetching player ID for playerName: ${playerName} and clubName: ${clubName}`);
            try {
                // Chiamata API per ottenere i suggerimenti dei giocatori
                const response = await axios.get(
                    `https://apigw.fotmob.com/searchapi/suggest?term=${encodeURIComponent(playerName)}&lang=en`
                );
                
                console.log('API response:', response.data);
                
                const players = response.data.squadMemberSuggest;

                if (players.length > 0) {
                    // Flatten the players array
                    const filteredPlayers = players.flatMap(playerGroup =>
                        playerGroup.options.map(option => option.payload)
                    );

                    console.log('Filtered players:', filteredPlayers);

                    // Se c'è solo un giocatore, restituisci il suo ID direttamente
                    if (filteredPlayers.length === 1) {
                        console.log('Only one player found. Returning this player.');
                        setPlayerId(filteredPlayers[0].id);
                        return;
                    }

                    if (clubName) {
                        const bestMatch = filteredPlayers
                            .map(player => {
                                const playerTeamName = player.teamName || '';
                                const commonWordCount = getCommonWordCount(playerTeamName, clubName);
                                return { ...player, commonWordCount };
                            })
                            .sort((a, b) => b.commonWordCount - a.commonWordCount)[0]; // Ordina per numero di parole in comune

                        if (bestMatch) {
                            console.log('Best match based on club name:', bestMatch);
                            setPlayerId(bestMatch.id);
                        } else {
                            console.log('No matching club found.');
                            setError('Player found, but no matching club.');
                        }
                    } else {
                        // Se il nome del club non è fornito, scegli il primo giocatore
                        console.log('No club name provided. Choosing the first player.');
                        setPlayerId(filteredPlayers[0]?.id);
                    }
                } else {
                    console.log('No players found.');
                    setError('Player not found');
                }
            } catch (err) {
                console.error('Error fetching player:', err);
                setError('Error fetching player');
            } finally {
                setLoading(false);
            }
        };

        fetchPlayerId();
    }, [playerName, clubName]);

    return { playerId, loading, error };
};

export default usePlayerId;
