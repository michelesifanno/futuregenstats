import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, useMediaQuery, Box } from '@mui/material';
import { useTheme } from '@emotion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Componente PlayerFaq
export default function PlayerFaq({ name, meta }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Estrazione di faqJSONLD dal meta
    const faqJSONLD = meta?.faqJSONLD;

    // Funzione per rendere le FAQ
    const renderFaq = (faqData) => {
        if (!faqData || !faqData.mainEntity) {
            return <Typography>No FAQs available</Typography>;
        }

        return faqData.mainEntity.map((faq, index) => (
            <Accordion
            key={index}
            sx={{padding:'0px!important', margin:'0px!important'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{fontSize:'14px!important'}}/>}
                    aria-controls={`faq-${index}`}
                    id={`faq-${index}`}
                    sx={{padding:'0px!important', margin:'0px!important', borderBottom:'1px solid #eee'}}
                >
                    <Typography sx={{ fontWeight: 500, fontSize: '12px' }}>
                        {faq.name}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ fontWeight: 400, fontSize: '12px', color:'#888' }}>
                        {faq.acceptedAnswer.text}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        ));
    };

    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="career-stats"
                id="career-stats"
            >
                <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
                    About {name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {renderFaq(faqJSONLD)}
            </AccordionDetails>
        </Accordion>
    );
}