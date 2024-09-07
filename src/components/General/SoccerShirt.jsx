import React from 'react';
import shirt from '/shirt.svg'; // Usa il percorso corretto

const SoccerShirt = ({ number }) => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
        <img
            src={shirt}
            alt="Soccer Shirt"
            style={{ width: '50px', height: 'auto' }} // Regola le dimensioni se necessario
        />
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '16px', // Modifica la dimensione del testo se necessario
            color: '#FFF', // Modifica il colore del numero
            fontFamily: 'Montserrat',
            fontWeight: 'bold'
        }}>
            {number}
        </div>
    </div>
);

export default SoccerShirt;
