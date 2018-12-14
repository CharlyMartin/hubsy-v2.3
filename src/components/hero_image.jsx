import React from 'react';
import Image from '../components/image';

import '../css/components/hero_image.css';
import caret from '../images/icons/caret.png'

import { fadeinImages } from '../utilities/fadein_images';

class HeroImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: this.formatImages(this.props.images),
      index: 0,
      intervalID: this.initSlider
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

    this.setState({index: this.state.index += 1});
  }

  getPreviousSlide() {
    if (this.isFirst()) {
      this.setState({index: this.getLastIndex()});
      return;
    }

    this.setState({index: this.state.index -= 1})
  }

  // initSlider() {
  //   return setInterval(() => {
  //     this.getNextSlide();
  //   }, 2000);
  // }

  // componentDidMount() {
  //   this.initSlider()
  // }

  render() {
    const style = {
      backgroundImage: `url(${this.state.images[this.state.index]})`,
    }

    return (
      <div className={`hero-image ${this.props.class}`} style={style} data-animation="fade-in">
        
        {this.props.children}

        <div className="arrows">
          <div className="arrow-container" id="left" onClick={this.getPreviousSlide.bind(this)}>
            <div className="arrow">
              <Image src={caret} />
            </div>
          </div>
          
          <div className="arrow-container" id="right" onClick={this.getNextSlide.bind(this)}>
            <div className="arrow">
              <Image src={caret} />
            </div>
          </div>
        </div>
      </div>
    );
  }

};


export default HeroImage;