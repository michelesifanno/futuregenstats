import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, Avatar, CircularProgress } from '@mui/material';
import usePlayerFotMobData from '../../utils/usePlayerFotMobData';
import supabase from '../../supabase/client'


const PlayerDetails = ({ playerId }) => {
    const { playerData, loading, error } = usePlayerFotMobData(playerId);
    const [clubs, setClubs] = useState([]);
    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        const fetchClubsAndCompetitions = async () => {
            try {
                // Fetch clubs
                let { data: clubsData, error: clubsError } = await supabase
                    .from('clubs')
                    .select('*');

                if (clubsError) throw clubsError;

                // Fetch competitions
                let { data: competitionsData, error: competitionsError } = await supabase
                    .from('competitions')
                    .select('*');

                if (competitionsError) throw competitionsError;

                setClubs(clubsData);
                setCompetitions(competitionsData);
            } catch (err) {
                console.error('Error fetching data from Supabase', err);
            }
        };

        fetchClubsAndCompetitions();
    }, []);


    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!playerData) return <Typography>No player data available</Typography>;

    
    const playerInfo = playerData.playerInformation || [];
    const getPlayerInfo = (title) => {
        const info = playerInfo.find(item => item.title === title);
        return info ? info.value.fallback : 'N/A';
    };
    const getStatValue = (title) => {
        const stat = playerData.mainLeague.stats.find(stat => stat.title === title);
        return stat ? stat.value : 'N/A';
    };

    
    const getClubLogo = (teamId) => {
        const club = clubs.find(club => club.id === teamId);
        return club ? club.image : null;
    };

    const getCompetitionLogo = (competitionId) => {
        const competition = competitions.find(comp => comp.id === competitionId);
        return competition ? competition.competitionimage : null;
    };

    const renderRecentMatches = () => {
        if (!playerData.recentMatches || playerData.recentMatches.length === 0) {
            return <Typography>No recent matches data available</Typography>;
        }

        return (
            <Card>
                <CardContent>
                    <Typography variant="h6">Recent Matches</Typography>
                    <List>
                        {playerData.recentMatches.map(match => (
                            <ListItem key={match.id}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1"><strong>Date:</strong> {new Date(match.matchDate.utcTime).toLocaleDateString()}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Typography variant="body1"><strong>Opponent:</strong> {match.opponentTeamName}</Typography>
                                        <Typography variant="body1"><strong>Score:</strong> {match.homeScore}-{match.awayScore}</Typography>
                                        <Typography variant="body1"><strong>Minutes Played:</strong> {match.minutesPlayed}</Typography>
                                        <Typography variant="body1"><strong>Goals:</strong> {match.goals} | <strong>Assists:</strong> {match.assists} | <strong>Yellow Cards:</strong> {match.yellowCards} | <strong>Red Cards:</strong> {match.redCards} | <strong>Rating:</strong> {match.ratingProps.num}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        );
    };

    const renderCareerHistory = () => {
        if (!playerData.careerHistory || !playerData.careerHistory.careerItems) return <Typography>No career history available</Typography>;

        return (
            <Card>
                <CardContent>
                    <Typography variant="h6">Career History</Typography>
                    {Object.entries(playerData.careerHistory.careerItems).map(([level, entries]) => (
                        <div key={level}>
                            <Typography variant="h6">{level}</Typography>
                            <List>
                                {entries.teamEntries.map(entry => (
                                    <ListItem key={entry.teamId}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={4}>
                                                <Typography variant="body1"><strong>Team:</strong> {entry.team}</Typography>
                                                {getClubLogo(entry.teamId) && (
                                                    <Avatar src={getClubLogo(entry.teamId)} alt={entry.team} sx={{ width: 50, height: 50 }} />
                                                )}
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <Typography variant="body1"><strong>Appearances:</strong> {entry.appearances} | <strong>Goals:</strong> {entry.goals} | <strong>Assists:</strong> {entry.assists}</Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    };

    const renderTrophies = () => {
        if (!playerData.trophies || playerData.trophies.playerTrophies.length === 0) return <Typography>No trophies available</Typography>;

        return (
            <Card>
                <CardContent>
                    <Typography variant="h6">Trophies</Typography>
                    <List>
                        {playerData.trophies.playerTrophies.map(trophy => (
                            <ListItem key={trophy.teamId}>
                                <Typography variant="body1"><strong>{trophy.teamName}:</strong></Typography>
                                <List>
                                    {trophy.tournaments.map(tournament => (
                                        <ListItem key={tournament.leagueId}>
                                            <Typography variant="body2">{tournament.leagueName} - {tournament.seasonsWon.join(', ')}</Typography>
                                        </ListItem>
                                    ))}
                                </List>
                                {getCompetitionLogo(trophy.teamId) && (
                                    <Avatar src={getCompetitionLogo(trophy.teamId)} alt={trophy.teamName} sx={{ width: 50, height: 50 }} />
                                )}
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        );
    };

    const renderAdvancedStats = () => {
        if (!playerData.traits) return <Typography>No advanced stats available</Typography>;

        return (
            <Card>
                <CardContent>
                    <Typography variant="h6">Advanced Stats</Typography>
                    <List>
                        {playerData.traits.items.map(stat => (
                            <ListItem key={stat.key}>
                                <ListItemText primary={stat.title} secondary={stat.value} />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        );
    };

    const renderCompetitionStats = () => {
        if (!playerData.statSeasons || playerData.statSeasons.length === 0) return <Typography>No competition stats available</Typography>;

        return (
            <Card>
                <CardContent>
                    <Typography variant="h6">Competition Stats</Typography>
                    {playerData.statSeasons.map(season => (
                        <div key={season.seasonName}>
                            <Typography variant="h6">{season.seasonName}</Typography>
                            <List>
                                {season.tournaments.map(tournament => (
                                    <ListItem key={tournament.tournamentId}>
                                        {getCompetitionLogo(tournament.tournamentId) && (
                                            <Avatar src={getCompetitionLogo(tournament.tournamentId)} alt={tournament.name} sx={{ width: 50, height: 50 }} />
                                        )}
                                        <ListItemText primary={tournament.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    };

    const renderShotMap = () => {
        if (!playerData.shotmap || playerData.shotmap.length === 0) return <Typography>No shot map data available</Typography>;

        return (
            <Card>
                <CardContent>
                    <Typography variant="h6">Shot Map</Typography>
                    <List>
                        {playerData.shotmap.map(shot => (
                            <ListItem key={shot.id}>
                                <Typography variant="body1"><strong>Minute:</strong> {shot.min} | <strong>Type:</strong> {shot.eventType} | <strong>xG:</strong> {shot.expectedGoals}</Typography>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        );
    };

    const renderPlayerTraits = () => {
        if (!playerData.traits || !playerData.traits.items || playerData.traits.items.length === 0) return <Typography>No player traits available</Typography>;

        return (
            <Card>
                <CardContent>
                    <Typography variant="h6">Player Traits</Typography>
                    <List>
                        {playerData.traits.items.map(trait => (
                            <ListItem key={trait.key}>
                                <ListItemText primary={trait.title} secondary={trait.value} />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        );
    };

    const renderFAQ = () => {
        if (!playerData.meta || !playerData.meta.faqJSONLD || playerData.meta.faqJSONLD.mainEntity.length === 0) return <Typography>No FAQs available</Typography>;

        return (
            <Card>
                <CardContent>
                    <Typography variant="h6">FAQs</Typography>
                    <List>
                        {playerData.meta.faqJSONLD.mainEntity.map(faq => (
                            <ListItem key={faq.name}>
                                <ListItemText primary={faq.name} secondary={faq.acceptedAnswer.text} />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        );
    };

    const renderBreadcrumbs = () => {
        if (!playerData.meta || !playerData.meta.breadcrumbJSONLD || playerData.meta.breadcrumbJSONLD.itemListElement.length === 0) return <Typography>No breadcrumbs available</Typography>;

        return (
            <Card>
                <CardContent>
                    <Typography variant="h6">Breadcrumbs</Typography>
                    <List>
                        {playerData.meta.breadcrumbJSONLD.itemListElement.map((crumb, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={<a href={crumb.item}>{crumb.name}</a>} />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        );
    };

    const renderPersonInfo = () => {
        if (!playerData.meta || !playerData.meta.personJSONLD) return <Typography>No person info available</Typography>;

        const person = playerData.meta.personJSONLD;

        return (
            <Card>
                <CardContent>
                    <Typography variant="h6">Person Info</Typography>
                    <Typography variant="body1"><strong>Name:</strong> {person.name}</Typography>
                    <Typography variant="body1"><strong>Birthdate:</strong> {new Date(person.birthDate).toLocaleDateString()}</Typography>
                    <Typography variant="body1"><strong>Nationality:</strong> {person.nationality.name}</Typography>
                    <Typography variant="body1"><strong>Affiliation:</strong> {person.affiliation.name}</Typography>
                    <Typography variant="body1"><strong>Height:</strong> {person.height.value} {person.height.unitText}</Typography>
                    <Typography variant="body1"><strong>Weight:</strong> {person.weight.value} {person.weight.unitText}</Typography>
                </CardContent>
            </Card>
        );
    };

    return (
        <Container>
            <Typography variant="h2">{playerData.name}</Typography>
            <Typography variant="h5"><strong>Team:</strong> {playerData.primaryTeam.teamName}</Typography>
            <Typography variant="h6"><strong>Position:</strong> {playerData.positionDescription.primaryPosition.label}</Typography>
            <Typography variant="body1"><strong>Birthdate:</strong> {new Date(playerData.birthDate.utcTime).toLocaleDateString()}</Typography>
            <Typography variant="body1"><strong>Height:</strong> {getPlayerInfo('Height')}</Typography>
            <Typography variant="body1"><strong>Shirt Number:</strong> {getPlayerInfo('Shirt')}</Typography>
            <Typography variant="body1"><strong>Preferred Foot:</strong> {getPlayerInfo('Preferred foot')}</Typography>
            <Typography variant="body1"><strong>Country:</strong> {getPlayerInfo('Country')}</Typography>
            <Typography variant="body1"><strong>Market Value:</strong> {getPlayerInfo('Market value')}</Typography>
            <Typography variant="body1"><strong>Main Position:</strong> {playerData.positionDescription.label}</Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    {renderRecentMatches()}
                </Grid>
                <Grid item xs={12} md={6}>
                    {renderCareerHistory()}
                </Grid>
                <Grid item xs={12} md={6}>
                    {renderTrophies()}
                </Grid>
                <Grid item xs={12} md={6}>
                    {renderAdvancedStats()}
                </Grid>
                <Grid item xs={12} md={6}>
                    {renderCompetitionStats()}
                </Grid>
                <Grid item xs={12} md={6}>
                    {renderShotMap()}
                </Grid>
                <Grid item xs={12} md={6}>
                    {renderPlayerTraits()}
                </Grid>
                <Grid item xs={12} md={6}>
                    {renderFAQ()}
                </Grid>
                <Grid item xs={12} md={6}>
                    {renderBreadcrumbs()}
                </Grid>
                <Grid item xs={12}>
                    {renderPersonInfo()}
                </Grid>
            </Grid>
        </Container>
    );
};

export default PlayerDetails;
