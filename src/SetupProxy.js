const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
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
};
