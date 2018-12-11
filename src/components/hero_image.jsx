import React from 'react';
import Image from '../components/image';

import '../css/components/hero_image.css';
import caret from '../images/icons/caret.png'

class HeroImaga extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: this.formatImages(this.props.images),
      currentImage: this.formatImages(this.props.images)[0]
    }
  }

  formatImages(array) {
    return array.map(i => i.url);
  }

  // getFirstImage() {
  //   return this.state.images[0]
  // }

  render() {
    console.log(this.state.images)
    return (
      <div
        className={`hero-image image-centered ${this.props.class}`}
        style={{ backgroundImage: `url(${this.state.currentImage})`}}>
        
        {this.props.children}

        <div className="arrows">
          <div className="arrow" id="left">
            <Image src={caret}/>
          </div>
          <div className="arrow" id="right">
            <Image src={caret}/>
          </div>
        </div>
      </div>
    );
  }

};

export default HeroImaga;