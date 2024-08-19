// api/proxy.js
export default async function handler(req, res) {
    const url = `https://www.fotmob.com${req.url}`;
  
    const response = await fetch(url, {
      method: req.method,
      headers: {
        ...req.headers,
        // Se necessario, aggiungi altri headers specifici
      },
    });
  
    const data = await response.text(); // Usa .json() se l'API ritorna JSON
  
    // Imposta le intestazioni per la risposta
    res.setHeader('Content-Type', response.headers.get('Content-Type'));
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permetti tutte le origini
  
    res.status(response.status).send(data);
  }
  