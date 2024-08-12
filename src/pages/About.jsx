import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import BestPlayersByCompetition from '../components/BestPlayersByCompetition';

export default function About () {

  return (
    <Container maxWidth="md" sx={{ padding: '160px 0px 40px 0px' }}>
        <BestPlayersByCompetition  />
      <Typography variant="h2" gutterBottom>
         a Future Gen Stats
      </Typography>

      <Typography variant="h5" paragraph>
        Negli ultimi anni, nonostante l'Italia abbia una delle migliori squadre giovanili a livello internazionale, i giovani talenti italiani faticano a trovare spazio nei top club di Serie A. La Nazionale maggiore non riesce a capitalizzare questo potenziale, come dimostrato dai recenti insuccessi. Il nostro obiettivo è quindi creare una piattaforma che raccolga dati su questa situazione e fornisca un'analisi dettagliata per evidenziare il problema.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Evoluzione del Progetto
      </Typography>
      <Typography variant="body1" paragraph>
        Future Gen Stats è nato come risposta a una lacuna nel monitoraggio e nell'analisi dei giovani talenti calcistici. L'idea iniziale era di offrire uno strumento che non solo raccogliesse dati sui calciatori, ma li analizzasse in modo approfondito per identificare i migliori giovani talenti. Con il tempo, abbiamo evoluto il progetto per includere una serie di funzionalità avanzate che migliorano l'esperienza utente e facilitano la ricerca di informazioni.
      </Typography>
      <Typography variant="body1" paragraph>
        Oltre al nostro algoritmo per identificare i giocatori più esperti, che considera le prestazioni in competizioni di alto livello come la UEFA Champions League e la Premier League, abbiamo sviluppato algoritmi specifici per classificare i migliori giovani calciatori. Questi algoritmi tengono conto di variabili come i gol, gli assist, i minuti giocati e l'importanza delle competizioni.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Vantaggi di Future Gen Stats
      </Typography>
      <Typography variant="body1" paragraph>
        **Future Gen Stats** non è solo un altro sito che visualizza dati sui singoli calciatori. Offriamo una piattaforma unica che mostra i migliori giovani talenti per categoria e nel complesso, con un'attenzione particolare alla User Experience e alla facilità di accesso alle informazioni. Le nostre tabelle e classifiche sono progettate per fornire una panoramica chiara e dettagliata dei talenti emergenti, aiutando club e scout a prendere decisioni informate.
      </Typography>
      <Typography variant="body1" paragraph>
        Il progetto attualmente si basa sui dati del 2023. Tuttavia, prevediamo di aggiornare la piattaforma con nuovi dati e di implementare la possibilità di fare lo switch tra le stagioni 2023 e 2024. Inoltre, i dati saranno aggiornati a cadenza trimestrale o semestrale, garantendo che le informazioni siano sempre fresche e rilevanti.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Caratteristiche del Backend
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Algoritmo di Punteggio Avanzato" secondary="Utilizziamo un algoritmo di punteggio che attribuisce pesi specifici alle competizioni, considerando la loro importanza e le performance dei giocatori per offrire una valutazione accurata dei talenti." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Classifiche Dettagliate" secondary="Le classifiche sono generate per mostrare i migliori giovani calciatori per competizione, nazionalità e in generale, suddivisi per fasce di età come Under 18, Under 19, Under 20, ecc." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Gestione dei Dati e Aggiornamenti" secondary="Il sistema di backend è progettato per gestire e aggiornare i dati in modo efficiente, con aggiornamenti regolari per garantire che le informazioni siano sempre attuali." />
        </ListItem>
        <ListItem>
          <ListItemText primary="User Experience Ottimizzata" secondary="La piattaforma è sviluppata con un focus sulla facilità di utilizzo e sull'accesso rapido alle informazioni, migliorando l'esperienza utente complessiva." />
        </ListItem>
      </List>

      <Typography variant="h4" gutterBottom>
        Conclusioni
      </Typography>
      <Typography variant="body1">
        Future Gen Stats rappresenta un passo avanti significativo nel monitoraggio e nell'analisi dei giovani talenti calcistici. Con un backend robusto, algoritmi avanzati e una piattaforma user-friendly, siamo pronti a offrire uno strumento innovativo per la gestione dei dati calcistici. Il nostro obiettivo è trasformare il modo in cui i talenti emergenti vengono analizzati e valorizzati, supportando club e scout con informazioni precise e dettagliate.
      </Typography>
    </Container>
  );
};