import { useState } from 'react';
import {Box, Grid, Typography, useMediaQuery, Table, TableBody, TableCell, TableContainer, TableRow, Accordion, AccordionSummary, AccordionDetails, CircularProgress, TablePagination} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { useNationalities } from '../../utils/useNationalities';
import NationFlag from '../General/NationFlag';
  


export default function YouthByNationality() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { nations, loading, error } = useNationalities();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        document.querySelector('#nationalities-list').scrollIntoView({
          behavior: 'smooth'
        });      
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
      const paginatedNations = nations ? nations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];
    

    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="nationalities-list"
                id="nationalities-list"
            >
          <Typography sx={{ fontWeight: 600, fontSize:'18px'}}>
                Young Players by Nations 🌍
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0px' }}>
            {loading ? (
                  <Box sx={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                <Grid container spacing={2}>
                    {paginatedNations.slice(0, 6).map((nation, index) => (
                        <Grid 
                        item 
                        xs={12} 
                        key={index} 
                        sx={{ 
                            padding: '15px 20px!important', 
                            borderBottom: index !== nations.length - 1 ? '1px solid #eee' : 'none',
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                                cursor: 'pointer',
                            },
                        }}                        >
                        <Link to={`/nation/${nation.name}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            
                        <NationFlag nation={nation} />
                            <Typography sx={{ fontWeight: 500, fontSize: '14px', color:'#333', marginLeft:'17px',
                            '&:hover': {
                                color: '#2047e4', 
                            },
}}>
                                {nation.name}
                            </Typography>
                        </Link>
                    </Grid>
                ))}
                </Grid>
                <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={nations.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{margin:'0px!important', padding:'0px!important'}}
          />
                </>
                )}
            </AccordionDetails>
        </Accordion>
    );
}
