import React from 'react';
import Image from '../components/image';

import '../css/components/hero_image.css';
import caret from '../images/icons/caret.png'

class HeroImage extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      images: this.formatImages(this.props.images),
      selectedImage: 0,
    }
  }

  formatImages(array) {
    return array.map(i => i.url);
  }

  getLastIndex() {
    return (this.state.images.length - 1);
  }

  isLast() {
    return (this.getLastIndex() === this.state.selectedImage);
  }

  isFirst() {
    return (this.state.selectedImage === 0);
  }

  getNextSlide() {
    if (this.isLast()) {
      this.setState({selectedImage: 0});
      return;
    }

    this.setState({selectedImage: this.state.selectedImage += 1});
  }

  getPreviousSlide() {
    if (this.isFirst()) {
      this.setState({selectedImage: this.getLastIndex()});
      return;
    }

    this.setState({selectedImage: this.state.selectedImage -= 1})
  }

  render() {
    const style = {
      backgroundImage: `url(${this.state.images[this.state.selectedImage]})`,
    }

    return (
      <div className={`hero-image image-centered ${this.props.class}`} style={style}>
        
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