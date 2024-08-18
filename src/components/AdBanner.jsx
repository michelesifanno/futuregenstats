// AdBanner.js
import React, { useEffect } from 'react';

export default function AdBanner ({ adClient, adSlot, adFormat, fullWidthResponsive }) {
  useEffect(() => {
    // Crea lo script dell'annuncio
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-ad-client', adClient);
    
    // Aggiunge lo script alla pagina
    document.body.appendChild(script);

    // Pusha gli annunci su google
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    
    return () => {
      // Pulisce il script quando il componente viene smontato
      document.body.removeChild(script);
    };
  }, [adClient]);

  return (
    <div>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client={adClient}
           data-ad-slot={adSlot}
           data-ad-format={adFormat}
           data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}>
      </ins>
    </div>
  );
};