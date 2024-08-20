import React from 'react';
import usePlayerFotMobData from '../utils/usePlayerFotMobData';

const PlayerDetails = ({ playerId }) => {
    const { playerData, loading, error } = usePlayerFotMobData(playerId);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!playerData) return <div>No player data available</div>;

    const getStatValue = (title) => {
        const stat = playerData.mainLeague?.stats?.find(stat => stat.title === title);
        return stat ? stat.value : 'N/A';
    };


    return (
        <div>
            <h2>{playerData.name}</h2>
            <p><strong>Team:</strong> {playerData.primaryTeam?.teamName || 'N/A'}</p>
            <p><strong>Position:</strong> {playerData.positionDescription?.label || 'N/A'}</p>
            <p><strong>Birthdate:</strong> {playerData.birthDate?.utcTime ? new Date(playerData.birthDate.utcTime).toLocaleDateString() : 'N/A'}</p>
            
            <p><strong>Main Position:</strong> {playerData.positionDescription?.label || 'N/A'}</p>

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
