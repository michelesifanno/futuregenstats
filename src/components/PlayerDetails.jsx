import React from 'react';
import usePlayerFotMobData from '../utils/usePlayerFotMobData';

const PlayerDetails = ({ playerId }) => {
    const { playerData, loading, error } = usePlayerFotMobData(playerId);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!playerData) return <div>No player data available</div>;

    // Funzione per ottenere il valore della statistica dato il titolo
    const getStatValue = (title) => {
        const stat = playerData.mainLeague.stats.find(stat => stat.title === title);
        return stat ? stat.value : 0;
    };

    // Funzione per formattare la data del match
    const formatMatchDate = (date) => {
        if (!date) return 'N/A';
        const matchDate = new Date(date);
        return `${matchDate.getDate()} ${matchDate.toLocaleString('default', { month: 'short' })}`;
    };

    // Renderizza le statistiche recenti
    const renderRecentMatches = () => {
        if (!playerData.recentMatches || playerData.recentMatches.length === 0) {
            return <p>No recent matches data available</p>;
        }

        return (
            <ul>
                {playerData.recentMatches.map(match => (
                    <li key={match.id}>
                        <strong>{formatMatchDate(match.matchDate.utcTime)}</strong> - {match.opponentTeamName} {match.homeScore}-{match.awayScore} ({match.minutesPlayed} min) <br />
                        Goals: {match.goals} | Assists: {match.assists} | Yellow Cards: {match.yellowCards} | Red Cards: {match.redCards} | Rating: {match.ratingProps.num}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            <h2>{playerData.name}</h2>
            <p><strong>Team:</strong> {playerData.primaryTeam.teamName}</p>
            <p><strong>Position:</strong> {playerData.positionDescription.strPos}</p>
            <p><strong>Birthdate:</strong> {new Date(playerData.birthDate.utcTime).toLocaleDateString()}</p>
            {/* Esempio di visualizzazione dell'altezza */}
            {/* <p><strong>Height:</strong> {getPlayerInfo('Height')}</p> */}
            {/* <p><strong>Shirt Number:</strong> {getPlayerInfo('Shirt Number')}</p> */}
            {/* <p><strong>Preferred Foot:</strong> {getPlayerInfo('Preferred Foot')}</p> */}
            {/* <p><strong>Country:</strong> {getPlayerInfo('Country')}</p> */}
            {/* <p><strong>Market Value:</strong> {getPlayerInfo('Market Value')}</p> */}
            <p><strong>Main Position:</strong> {playerData.positionDescription.label}</p>

            <h3>Stats</h3>
            <p><strong>Goals:</strong> {getStatValue('Goals')}</p>
            <p><strong>Assists:</strong> {getStatValue('Assists')}</p>
            <p><strong>Started:</strong> {getStatValue('Started')}</p>
            <p><strong>Matches:</strong> {getStatValue('Matches')}</p>
            <p><strong>Minutes played:</strong> {getStatValue('Minutes played')}</p>
            <p><strong>Rating:</strong> {getStatValue('Rating')}</p>
            <p><strong>Yellow cards:</strong> {getStatValue('Yellow cards')}</p>
            <p><strong>Red cards:</strong> {getStatValue('Red cards')}</p>

            <h3>Recent Matches</h3>
            {renderRecentMatches()}
        </div>
    );
};

export default PlayerDetails;
