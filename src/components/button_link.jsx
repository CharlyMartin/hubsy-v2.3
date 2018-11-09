import React from 'react';
import { Link } from 'gatsby';

import '../css/components/button.css'

const ButtonLink = (props) => {
  return (
    <Link to={props.path}>
      <span className={`button ${props.class}`}>
        {props.content}
      </span>
    </Link>
  );
};

export { ButtonLink };