import React, { Children } from 'react';

import '../css/components/card.css';

function Card(props) {

  return (
    <div className="card"
      >
      <div  className="card-picture image-centered"
            style={{backgroundImage: `url(${props.picture})`}}
            data-animation="fade-in" />

      <div className="card-content pd-md">
        <div className="card-text-container">
          <h2>{props.title}</h2>
          <p>{props.subtitle}</p>
        </div>

        <div className="card-badge-container">
          {props.children}
        </div>
      </div>
    </div>
  );

};

export default Card;