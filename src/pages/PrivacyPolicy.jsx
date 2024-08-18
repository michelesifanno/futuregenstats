import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: 8, marginBottom: 8 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Informativa sulla Privacy
        </Typography>
        <Typography variant="body1" paragraph>
          Ultimo aggiornamento: [Data]
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Introduzione
        </Typography>
        <Typography variant="body1" paragraph>
          Benvenuto su Future Gen Stats. Siamo impegnati a proteggere le tue informazioni personali e il tuo diritto alla privacy. 
          Questa Informativa sulla Privacy spiega come raccogliamo, utilizziamo, divulghiamo e proteggiamo le tue informazioni quando visiti il nostro sito web. 
          Ti preghiamo di leggere attentamente questa politica.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Informazioni Che Raccogliamo
        </Typography>
        <Typography variant="body1" paragraph>
          Non raccogliamo informazioni personali dagli utenti del nostro sito web. Non tracciamo, memorizziamo o abbiamo accesso a dati personali.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Cookie e Tecnologie di Tracciamento
        </Typography>
        <Typography variant="body1" paragraph>
          Il nostro sito web non utilizza cookie o altre tecnologie di tracciamento. Non monitoriamo le tue attività di navigazione né raccogliamo dati sulle tue visite.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Servizi di Terze Parti
        </Typography>
        <Typography variant="body1" paragraph>
          Il nostro sito web può contenere collegamenti a siti di terze parti. Non siamo responsabili per le pratiche sulla privacy di tali siti di terze parti. 
          Ti invitiamo a rivedere le loro politiche sulla privacy prima di fornire qualsiasi informazione personale.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Modifiche a Questa Informativa sulla Privacy
        </Typography>
        <Typography variant="body1" paragraph>
          Potremmo aggiornare questa Informativa sulla Privacy di tanto in tanto. Ti informeremo di eventuali modifiche pubblicando la nuova Informativa sulla Privacy su questa pagina. 
          Ti invitiamo a controllare periodicamente questa Informativa sulla Privacy per eventuali aggiornamenti.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Contattaci
        </Typography>
        <Typography variant="body1" paragraph>
          Se hai domande riguardanti questa Informativa sulla Privacy, ti preghiamo di contattarci all'indirizzo michelesifanno.ms@gmail.com.
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
