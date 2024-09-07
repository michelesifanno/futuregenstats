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

    return (
        <div className="flags-container">
            {nationsArray.map((nat, index) => {
                const nationName = typeof nat === 'string' ? nat : nat.name;
                const nationCode = flagCodes[nationName];


                if (localFlags[nationName]) {
                    const svgPath = `/flags/${localFlags[nationName]}.svg`;

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

                    return (
                        <Flag
                            key={index}
                            code={nationCode}
                            className="flag-style"
                        />
                    );
                }


                return null;
            })}
        </div>
    );
};

export default NationFlag;
