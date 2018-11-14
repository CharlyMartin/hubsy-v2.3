import React from 'react';
import { Link } from 'gatsby';

import '../css/components/card.css';

const Card = (props) => {
  return (
    <Link disabled to={`${props.locale}shops/${props.slug}`}>
      <div className="card">
        <div className="card-picture"></div>

        <div className="card-content">
          <div className="card-text-container">
            <h2>{props.name}</h2>
            <p>{props.address}</p>
          </div>

          <div className="card-badge-container">
            <p className="card-badge badge-green">{props.status}</p> 
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;