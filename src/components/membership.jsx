import React from 'react';
import Button from '../components/button';

import '../css/components/membership.css';

class Membership extends React.Component {
  constructor(props) {
    super(props)
  }

  toggle(event) {
    const el = event.currentTarget;
    el.querySelector('.membership-outlook').classList.toggle('hidden');
    el.querySelector('.membership-process').classList.toggle('active');
  }

  render() {
    return (
      <div className="membership" onClick={this.toggle}>
        <div className="membership-content pd-lg">

          <div className="membership-title text-center">
            <h3>{this.props.title}</h3>  
          </div>

          <div className="membership-outlook text-center">
            <p className="text-small">{this.props.subtitle}</p>

            <div className="membership-price">
              <p>{this.props.price}</p>
            </div>

            <div className="membership-button">
              <Button text={this.props.button} class="button-green-transparent" />
            </div>
          </div>

          <div className="membership-process">
            {this.props.children}
          </div>

        </div> 
      </div>
    );
  }

};

export default Membership;