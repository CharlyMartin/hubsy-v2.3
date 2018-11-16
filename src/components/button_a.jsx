import React from 'react';

import '../css/components/button.css'

const ButtonA = (props) => {
  return (
    <a href={props.path} target="_blank" rel="noopener noreferrer">
      <span className={`button ${props.class}`}>
        {props.text}
      </span>
    </a>
  );
};

export default ButtonA;