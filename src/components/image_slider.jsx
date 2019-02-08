// Libraries
import React from 'react';
import Img from 'gatsby-image';

// Components
import Image from './image';

// CSS
import '../css/components/image_slider.css';

// Images
import caret from '../images/icons/caret.png'


class ImageSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: this.props.images,
      index: 0,
    }
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

  render() {
    // console.log(this.props.images[0], this.state.index);
    const currentImg = this.props.images[this.state.index].node.childImageSharp.fluid;
    const style = {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%"
    }
    // console.log(currentImg)
    return (
      <div className={`hero-image ${this.props.class}`}>
        <Img fluid={currentImg} sizes={currentImg} style={style}/>

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


export default ImageSlider;