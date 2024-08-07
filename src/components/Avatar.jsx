import React from 'react';

const Avatar = ({ name }) => {
  const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
  return (
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#007bff',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '18px'
    }}>
      {initials}
    </div>
  );
};

const Flag = ({ nationality }) => {
  const flagSrc = `/flags/${nationality.toLowerCase()}.png`;
  return <img src={flagSrc} alt={nationality} style={{ width: '30px', height: '20px' }} />;
};

export { Avatar, Flag };
