import React from 'react';

export function Avatar ({ name }) {
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

export default Avatar;