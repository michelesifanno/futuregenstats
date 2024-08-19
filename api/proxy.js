import { NextResponse } from 'next/server';

export async function middleware(req) {
  const url = req.nextUrl.clone();
  url.hostname = 'www.fotmob.com';  // Cambia l'hostname al dominio della tua API
  url.protocol = 'https:';
  
  // Rimuovi '/api' dalla richiesta
  if (url.pathname.startsWith('/api')) {
    url.pathname = url.pathname.replace(/^\/api/, '');
  }

  // Aggiungi il target alla richiesta
  const response = await fetch(url, {
    method: req.method,
    headers: req.headers,
  });

  const resHeaders = new Headers(response.headers);
  resHeaders.set('Access-Control-Allow-Origin', '*');

  return new NextResponse(await response.text(), {
    status: response.status,
    headers: resHeaders,
  });
}
