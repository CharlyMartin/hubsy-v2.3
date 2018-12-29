import React from 'react';

import '../css/components/number.css';

const NumberItem = (props) => {
  return (
    <div className={`number-item ${props.class}`}>
      <p>{props.number}</p>
    </div>
  );
};

export default NumberItem;