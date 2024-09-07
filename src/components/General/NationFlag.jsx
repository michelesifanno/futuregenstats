import React from 'react';
import Flag from 'react-world-flags';
import { flagCodes } from '../../utils/flagCodes';

const NationFlag = ({ nation }) => {
    const localFlags = {
        'England': 'gb-eng',
        'Scotland': 'gb-sct',
        'Wales': 'gb-wls',
        'Northern Ireland': 'gb-nir',
        'Jersey': 'je',
        'Bermuda': 'bm',
        'Cape Verde': 'cv',
        'Cote d\'Ivoire': 'ci',
        'Curacao': 'cw',
        'Gibraltar': 'gi',
        'Hongkong': 'hk',
        'Martinique': 'mq',
        'Southern Sudan': 'ss',
        'St. Kitts & Nevis': 'kn',
        'St. Vincent & Grenadinen': 'vc',
        'The Gambia': 'gm',
        'United States': 'us'
    };

    // Verifica se nation è una stringa o un array
    const nationsArray = typeof nation === 'string'
        ? nation.split(',').map(n => n.trim())
        : Array.isArray(nation)
        ? nation
        : [nation];

    // Log di debug per visualizzare il contenuto di nationsArray
    console.log('Nations array:', nationsArray);

    return (
        <div className="flags-container">
            {nationsArray.map((nat, index) => {
                const nationName = typeof nat === 'string' ? nat : nat.name;
                const nationCode = flagCodes[nationName];

                // Log di debug per ciascuna nazione nel ciclo
                console.log(`Rendering flag for: ${nationName} (Code: ${nationCode})`);

                if (localFlags[nationName]) {
                    const svgPath = `/flags/${localFlags[nationName]}.svg`;

                    // Log di debug per percorsi SVG locali
                    console.log(`Using local SVG for: ${nationName}, Path: ${svgPath}`);

                    return (
                        <img
                            key={index}
                            src={svgPath}
                            alt={`${nationName} Flag`}
                            className='flag-style'
                        />
                    );
                }

                if (nationCode) {
                    // Log di debug per l'uso di react-world-flags
                    console.log(`Using react-world-flags for: ${nationName}, Code: ${nationCode}`);

                    return (
                        <Flag
                            key={index}
                            code={nationCode}
                            className="flag-style"
                        />
                    );
                }

                // Log per le nazioni non trovate
                console.log(`No flag found for: ${nationName}`);

                return null;
            })}
        </div>
    );
};

export default NationFlag;
