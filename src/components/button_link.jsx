import React from 'react';
import { Link } from 'gatsby';

import '../css/components/button.css'

const ButtonLink = (props) => {
  console.log(props)
  return (
    <Link to={props.path}>
      <span className={`button ${props.class}`}>
        {props.text}
      </span>
    </Link>
  );
};

export default ButtonLink;