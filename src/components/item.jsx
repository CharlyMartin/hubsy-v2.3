import React from 'react';

import '../css/components/item.css';

class Item extends React.Component {
  constructor(props) {
    super(props)
  }

  renderImg() {
    if (this.props.image === undefined) return;
    return (<img src={this.props.image} alt="" className="mg-lg-right" />);
  }

  render() {
    return (
      <div className="item mg-lg-bottom">
        {this.renderImg()}
        <p>{this.props.text}</p>
      </div>
    );
  }

};

export default Item;