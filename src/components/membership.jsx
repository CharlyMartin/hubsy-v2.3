import React from 'react';

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
        <div className="membership-content pd-md">

          <div className="membership-title text-center">
            <h3>Offre Semaine</h3>  
          </div>

          <div className="membership-outlook text-center">
            <p className="text-small">Profitez de tout Hubsy en illimité pendant 5 jours consécutifs</p>

            <div className="membership-price">
              <p>100$</p>
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