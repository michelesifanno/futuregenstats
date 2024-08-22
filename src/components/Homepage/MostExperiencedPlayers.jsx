import { useState } from 'react';
import { Grid, Button, Typography, useMediaQuery, Table, TableBody, TableCell, TableContainer, TableRow, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useMostExperiencedPlayers } from '../../utils/useMostExperiencedPlayers';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

// Stili personalizzati per i bottoni
const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2),
  '&.MuiButton-contained': {
    backgroundColor: 'rgba(32, 71, 228, 0.1)',
    border: '1px solid #0033cc',
    color: '#2047e4',
    boxShadow: 'none',
    borderRadius: '2px',
    '&:hover': {
      backgroundColor: 'rgba(32, 71, 228, 0.1)',
    },
  },
  '&.MuiButton-outlined': {
    borderColor: '#eee',
    color: '#2047e4',
    '&:hover': {
      borderColor: '#0033cc',
      backgroundColor: 'rgba(32, 71, 228, 0.1)',
    },
  },
}));

const rankStyles = {
  gold: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    color: '#CCAD07',
  },
  silver: {
    backgroundColor: 'rgba(192, 192, 192, 0.1)',
    color: '#959595',
  },
  bronze: {
    backgroundColor: 'rgba(205, 127, 50, 0.1)',
    color: '#CD7F32',
  },
};

export default function MostExperiencedPlayers() {
  const theme = useTheme();
  const [ageCategory, setAgeCategory] = useState('Under 23');
  const { players, loading: playersLoading, error: playersError } = useMostExperiencedPlayers(ageCategory);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));


  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setAgeCategory(newValue);
  };

  const sortedPlayers = players.sort((a, b) => a.rank - b.rank);

  if (playersError) return <p>Error: {playersError}</p>;

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="most-experienced-players"
          id="most-experienced-players"
        >
          <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
            Most Experienced Players 👴🏻
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '0px' }}>
          <Tabs
            value={ageCategory}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons="auto"
            centered
          >
            <Tab label="Under 18" value="Under 18" sx={{ fontSize: '12px!important', padding: '10px', width: isMobile ? 'auto' : '16.66%!important', textAlign: 'center' }} />
            <Tab label="Under 19" value="Under 19" sx={{ fontSize: '12px!important', padding: '10px', width: isMobile ? 'auto' : '16.66%!important', textAlign: 'center' }} />
            <Tab label="Under 20" value="Under 20" sx={{ fontSize: '12px!important', padding: '10px', width: isMobile ? 'auto' : '16.66%!important', textAlign: 'center' }} />
            <Tab label="Under 21" value="Under 21" sx={{ fontSize: '12px!important', padding: '10px', width: isMobile ? 'auto' : '16.66%!important', textAlign: 'center' }} />
            <Tab label="Under 22" value="Under 22" sx={{ fontSize: '12px!important', padding: '10px', width: isMobile ? 'auto' : '16.66%!important', textAlign: 'center' }} />
            <Tab label="Under 23" value="Under 23" sx={{ fontSize: '12px!important', padding: '10px', width: isMobile ? 'auto' : '16.66%!important', textAlign: 'center' }} />
          </Tabs>
          <TableContainer>
            <Table aria-label="most-experienced-players">
              <TableBody>
                {sortedPlayers.map((player, index) => {
                  let rankStyle = {};
                  if (index === 0) {
                    rankStyle = rankStyles.gold;
                  } else if (index === 1) {
                    rankStyle = rankStyles.silver;
                  } else if (index === 2) {
                    rankStyle = rankStyles.bronze;
                  }
                  return (
                    <TableRow
                      key={player.player_id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, ...rankStyle, padding: isMobile ? '10px' : '20px' }}
                    >
                      <TableCell align="center">
                        <Typography sx={{ fontWeight: 500, fontSize: '14px', color: rankStyle.color }}>
                          {player.rank}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <img src={player.player_image} alt={player.player_name} style={{ width: isMobile ? '26px' : '36px', borderRadius: '2px' }} />
                      </TableCell>
                      <TableCell align="left">
                        <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
                          <Link to={`/player/${player.player_id}`} style={{ textDecoration: 'none', color: '#333' }}>
                            {player.player_name}
                          </Link>
                        </Typography>
                        <Typography sx={{ fontWeight: 400, fontSize: '12px' }}>
                          {player.positions}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <img src={player.club_image} alt={`${player.club_name} logo`} style={{ width: isMobile ? '20px' : '30px' }} />
                      </TableCell>
                      <TableCell align="left" sx={{display: (isMobile || isTablet) ? 'none' : 'table-cell'}}>
                      <Typography sx={{ fontWeight: 500, fontSize: '12px' }}>
                          {player.marketvalue} {player.marketvaluecurrency}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography sx={{ fontWeight: 500, fontSize: '14px', color: rankStyle.color }}>
                          {player.total_score}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </>
  );
}