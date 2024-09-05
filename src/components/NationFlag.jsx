import React from 'react';
import Flag from 'react-world-flags';
import { flagCodes } from '../utils/flagCodes';

const NationFlag = ({ nation }) => {
    const nationCode = flagCodes[nation.name]; // Ottieni la sigla della nazione

    // Condizioni per le nazioni che hanno SVG locali
    const localFlags = {
        'England': 'gb-eng',
        'Scotland': 'gb-sct',
        'Wales': 'gb-wls',
        'Northern Ireland': 'gb-nir'
    };

    // Controlla se la nazione richiede un file SVG locale
    if (localFlags[nation.name]) {
        const svgPath = `/flags/${localFlags[nation.name]}.svg`; // Percorso dell'SVG nella cartella public

        return (
            <img
                src={svgPath}
                alt={`${nation.name} Flag`}
                className='flag-style'
            />
        );
    }

    // Se non è una di queste nazioni, usa react-world-flags
    return (
        <Flag
            code={nationCode}
            className="flag-style"
        />
    );
};

export default NationFlag;