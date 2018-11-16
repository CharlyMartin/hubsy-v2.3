import React from 'react';
import { Link } from 'gatsby';

import '../css/components/card.css';

class CardLink extends React.Component {
  constructor(props) {
    super(props)
  }

  setBadgeColor() {
    if (this.props.live === "true") return "badge-green"
    if (this.props.live === "false") return "badge-red"
  }

  render() {
    return (
      <Link to={`${this.props.locale}shops/${this.props.slug}`}>
        <div className="card">
          <div className="card-picture image-centered" style={{backgroundImage: `url(${this.props.picture})`}}>
          </div>
  
          <div className="card-content pd-md">
            <div className="card-text-container">
              <h2>{this.props.title}</h2>
              <p>{this.props.subtitle}</p>
            </div>
  
            <div className="card-badge-container">
              <p className={`card-badge ${this.setBadgeColor()}`}>{this.props.status}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

};

export default CardLink;