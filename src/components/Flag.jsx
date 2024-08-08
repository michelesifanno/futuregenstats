import React from 'react';
import { flagCodes } from '../utils/flagCodes';

export default function Flag({ nationality }) {
  const flagCode = flagCodes[nationality] || 'default'; // Usa un codice di fallback se il paese non è trovato
  const flagSrc = `/flags/${flagCode}.png`;

  return (
    <img
      src={flagSrc}
      alt={nationality}
      style={{ width: '20px' }}
      onError={(e) => {
        e.target.src = '/flags/default.png'; // Percorso per un'immagine di fallback
      }}
    />
  );
}
