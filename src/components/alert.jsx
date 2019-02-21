import React from 'react';
import cross_white from '../images/icons/cross_white.png';
import Image from './image';

// import { closeAlert } from '../utilities/close_alert';

import '../css/components/alert.css'

class Alert extends React.Component {
  constructor(props) {
    super(props)

    this.state = {visible: true}
  }

  // componentDidMount() {
  //   closeAlert();
  // This is removing an alert
  // but react does not know that because it's using document.addeventListener
  // Hence the previous bug
  // }

  close() {
    this.setState({ visible: false });
  }

  render() {
    // Returns nothing if visible state is false
    if (!this.state.visible) { return null }

    return (
      <div className="alert">
        <div className="container">
          <p>{this.props.content}</p>
          <div className="cross-container" onClick={this.close.bind(this)}>
            <Image src={cross_white}/>
          </div>
        </div>
      </div>
    );
  }
};

export default Alert;