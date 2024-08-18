import fs from 'fs';
import fetch from 'node-fetch';

const BASE_URL = 'https://www.futuregenstats.com/'; // Sostituisci con il tuo dominio
const API_URL = 'https://kvrzbmvyyitdzuflqlsq.supabase.co/rest/v1/rpc/get_player_ids?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2cnpibXZ5eWl0ZHp1ZmxxbHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4MTIzMTYsImV4cCI6MjAzODM4ODMxNn0.RzxPzOlhZc3rWtKeWtX7HXY9cnvYcLzWjCu1SSYwTk4'; // Include API key directly in URL

async function generateSitemap() {
  try {
    // Recupera gli ID dei player dalla tua API
    const response = await fetch(API_URL, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`Response Status: ${response.status}`); // Aggiungi il logging dello stato
      throw new Error(`Error fetching player IDs: ${response.statusText}`);
    }

    const players = await response.json();

    // Verifica se sono stati restituiti dati
    if (!Array.isArray(players)) {
      throw new Error('Invalid data format received from API');
    }

    // Route statiche definite in React Router Dom
    const staticRoutes = [
      '/',
      '/privacy-policy',
      '/best-under-18',
    ];

    // Mapperemo gli ID dei player in URL completi
    const playerRoutes = players.map(player => `player/${player.id}`);

    // Unione delle route statiche e dinamiche
    const allRoutes = [...staticRoutes, ...playerRoutes];

    // Creazione del contenuto della sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allRoutes
        .map(route => `
          <url>
            <loc>${BASE_URL}${route}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
          </url>
        `)
        .join('')}
    </urlset>`;

    // Scrittura della sitemap in un file
    fs.writeFileSync('public/sitemap.xml', sitemap);

    console.log('Sitemap generata con successo!');
  } catch (error) {
    console.error('Error generating sitemap:', error.message); // Aggiungi il logging dell'errore
  }
}

generateSitemap();
