import React from 'react';

import '../css/components/button.css'

const ButtonA = (props) => {
  return (
    <a className={`button ${props.class}`} href={props.path} target="_blank" rel="noopener noreferrer">
      {props.text}
    </a>
  );
};

export default ButtonA;