import fs from 'fs';
import fetch from 'node-fetch';

const BASE_URL = 'https://www.futuregenstats.com/';
const API_URL = 'https://kvrzbmvyyitdzuflqlsq.supabase.co/rest/v1/rpc/get_player_ids?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2cnpibXZ5eWl0ZHp1ZmxxbHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4MTIzMTYsImV4cCI6MjAzODM4ODMxNn0.RzxPzOlhZc3rWtKeWtX7HXY9cnvYcLzWjCu1SSYwTk4'; // Include API key directly in URL
const API_URL2 = 'https://kvrzbmvyyitdzuflqlsq.supabase.co/rest/v1/rpc/get_competition_ids?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2cnpibXZ5eWl0ZHp1ZmxxbHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4MTIzMTYsImV4cCI6MjAzODM4ODMxNn0.RzxPzOlhZc3rWtKeWtX7HXY9cnvYcLzWjCu1SSYwTk4'; // Include API key directly in URL


async function fetchAllPlayers() {
  const players = [];
  let offset = 0;
  const limit = 1000; // Adjust this based on the API's limits

  while (true) {
    const response = await fetch(`${API_URL}&limit=${limit}&offset=${offset}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`Response Status: ${response.status}`);
      throw new Error(`Error fetching player IDs: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      break; // Exit loop if no more data
    }

    players.push(...data); // Append the fetched data to the players array
    offset += limit; // Move to the next page
  }

  return players;
}

async function fetchAllCompetitions() {
  const competitions = [];
  let offset = 0;
  const limit = 1000; // Adjust this based on the API's limits

  while (true) {
    const response = await fetch(`${API_URL2}&limit=${limit}&offset=${offset}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`Response Status: ${response.status}`);
      throw new Error(`Error fetching player IDs: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      break; // Exit loop if no more data
    }

    competitions.push(...data); // Append the fetched data to the players array
    offset += limit; // Move to the next page
  }

  return competitions;
}

async function generateSitemap() {
  try {
    const players = await fetchAllPlayers();
    const competitions = await fetchAllCompetitions();

    if (!Array.isArray(players)) {
      throw new Error('Invalid data format received from API');
    }

    const staticRoutes = [
      '/',
      '/privacy-policy',
    ];

    const playerRoutes = players.map(player => `player/${player.id}`);
    
    const competitionRouter = competitions.map(competition => `league/${competition.id}`);

    const allRoutes = [...staticRoutes, ...playerRoutes];

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

    fs.writeFileSync('public/sitemap.xml', sitemap);

    console.log('Sitemap generata con successo!');
  } catch (error) {
    console.error('Error generating sitemap:', error.message);
  }
}

generateSitemap();