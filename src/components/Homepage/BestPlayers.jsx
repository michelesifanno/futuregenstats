import { useState } from 'react';
import { Box, Grid, Typography, useMediaQuery, Table, TableBody, TableCell, TableContainer, TableRow, Accordion, AccordionSummary, AccordionDetails, CircularProgress, TablePagination } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { usePlayersScoreAndTrends } from '../../utils/usePlayersScoreAndTrends';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import PlayerComponent from '../General/PlayerComponent';
import ClubComponent from '../General/ClubComponent';



const getTalentScoreColor = (score) => {
  if (score > 100) return '#C78E34';
  if (score > 80) return '#C73473';
  if (score > 60) return '#33C771';
  if (score > 40) return '#3482C7';
  if (score > 20) return '#C76434';
  if (20 < score) return '#C73434';
};


export default function BestPlayers() {
  const theme = useTheme();
  const { players, loading: playersLoading, error: playersError } = usePlayersScoreAndTrends();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    document.querySelector('#best-young-players').scrollIntoView({
      behavior: 'smooth'
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedPlayers = players ? players.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];


  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="best-young-players"
          id="best-young-players"
        >
          <Typography sx={{ fontWeight: 600, fontSize: '18px' }}>
            Best Young Players ⭐️
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '0px' }}>
          <TableContainer>
            <Table aria-label="best-young-players">
              <TableBody>
                {playersLoading ? (
                  <Box sx={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    {players.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography>No players found</Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedPlayers.map((player, index) => (
                        <TableRow
                          key={player.new_id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 }, padding: isMobile ? '10px' : '20px' }}
                        >
                          <TableCell sx={{ textAlign: 'center' }}>
                            <Grid container sx={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                              <Grid item xs={2} md={1}>
                                <PlayerComponent
                                  id={player.new_id}
                                  width={51}
                                  height={54}  
                                />
                              </Grid>
                              <Grid item xs={6} md={8} sx={{ textAlign: 'left', padding: '0px 10px!important' }}>
                                <Link to={`/player/${player.new_id}`} style={{ textDecoration: 'none', color: '#333' }}>
                                  <Typography sx={{
                                    fontWeight: 500, fontSize: '16px', letterSpacing: '-0.2px',
                                    '&:hover': {
                                      color: '#2047e4',
                                    },
                                  }}>
                                    {player.name}
                                  </Typography>
                                </Link>
                                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
                                  {player.positions}
                                </Typography>
                              </Grid>
                              <Grid item xs={2} md={2} sx={{ textAlign: 'center' }}>
                                <ClubComponent
                                  name={player.club.name}
                                  id={player.club.competition_id}
                                />
                              </Grid>
                              <Grid item xs={2} md={1} sx={{ justifyContent: 'center', display: 'flex' }}>
                                <Typography sx={{ padding: '10px 0px', borderRadius: '7px', minWidth: '45px', fontWeight: 600, fontSize: '18px', textAlign: 'center', color: '#fff', backgroundColor: getTalentScoreColor(player.normalized_talent_score) }}>
                                  {player.normalized_talent_score}
                                </Typography>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={players.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ margin: '0px!important', padding: '0px!important' }}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
