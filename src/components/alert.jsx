import React from 'react';
import cross_white from '../images/icons/cross_white.png';
import Image from './image';

import { closeAlert } from '../utilities/close_alert';

import '../css/components/alert.css'

class Alert extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    closeAlert();
  }

  render() {
    return (
      <div className="alert">
        <div className="container">
          <p>{this.props.content}</p>
          <div className="cross-container">
            <Image src={cross_white}/>
          </div>
        </div>
      </div>
    );
  }
};

export default Alert;