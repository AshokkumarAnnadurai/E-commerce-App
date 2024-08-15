// components/Star.js
import React from 'react';

const Star = ({ filled, half }: { filled: boolean; half?: boolean }) => {
  let starSymbol = '☆'; // Empty star by default

  if (filled) {
    starSymbol = '★'; // Full star
  } else if (half) {
    starSymbol = '★'; // Using the same symbol for both full and half stars, but style it differently
  }

  return (
    <span
      style={{
        color: filled || half ? '#FFD700' : '#dcdcdc', // Color the star accordingly
        fontSize: '20px',
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {half && !filled && (
        <span
          style={{
            color: '#dcdcdc', // Color for the half part
            position: 'absolute',
            width: '50%',
            overflow: 'hidden',
            display: 'inline-block',
            whiteSpace: 'nowrap',
            top: 0,
            left: 0,
            fontSize: '20px',
          }}
        >
          ★
        </span>
      )}
      {starSymbol}
      
    </span>
  );
};



export default Star;
