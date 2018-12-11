import React from 'react';
import Image from '../components/image';

import '../css/components/hero_image.css';
import caret from '../images/icons/caret.png'

class HeroImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: this.formatImages(this.props.images),
      index: 0
    }
  }

  formatImages(array) {
    return array.map(i => i.url);
  }

  getLastIndex() {
    return (this.state.images.length - 1);
  }

  isLast() {
    return (this.getLastIndex() === this.state.index);
  }

  isFirst() {
    return (this.state.index === 0);
    
  }

  getNextSlide() {
    if (this.isLast()) {
      this.setState({index: 0});
      return;
    }

    this.setState({index: this.state.index += 1})
  }

  getPreviousSlide() {
    if (this.isFirst()) {
      this.setState({index: this.getLastIndex()});
      return;
    }

    this.setState({index: this.state.index -= 1})
  }


  render() {
    const style = {
      backgroundImage: `url(${this.state.images[this.state.index]})`,
    }
    return (
      <div className={`hero-image image-centered ${this.props.class}`} style={style}>
        
        {this.props.children}

        <div className="arrows">
          <div className="arrow" id="left" onClick={this.getPreviousSlide.bind(this)}>
            <Image src={caret} />
          </div>
          <div className="arrow" id="right" onClick={this.getNextSlide.bind(this)}>
            <Image src={caret} />
          </div>
        </div>
      </div>
    );
  }

};

export default HeroImage;