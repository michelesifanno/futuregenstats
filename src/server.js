// server.js (o il nome del tuo file server)
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://www.fotmob.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // Rimuovi '/api' dalla richiesta
    },
  })
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
