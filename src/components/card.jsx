import React from 'react';
import { Link } from 'gatsby';

const Card = (props) => {
  return (
    <div className="card">
      <Link to={`${props.locale}shops/${props.data.slug}`}>
        <h2>{props.data.name}</h2>
        <p>{props.data.address}</p>
        <p>{props.data.status}</p>
      </Link>
    </div>
  );
};

export default Card;