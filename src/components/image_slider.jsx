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
      // images: this.props.images,
      selectedImg: 0,
    }
  }

  getLastIndex() {
    const result = this.props.images.length - 1;
    // console.log(result);
    return result;
  }

  isLast() {
    const result = (this.getLastIndex() === this.state.selectedImg);
    // console.log(result);
    return result;
  }

  isFirst() {
    const result = this.state.selectedImg === 0
    // console.log(result);
    return result;
  }

  getNextSlide() {
    if (this.isLast()) {
      this.setState({selectedImg: 0});
      return;
    }

    this.setState({selectedImg: this.state.selectedImg += 1});
  }

  getPreviousSlide() {
    if (this.isFirst()) {
      this.setState({selectedImg: this.getLastIndex()});
      return;
    }

    this.setState({selectedImg: this.state.selectedImg -= 1})
  }

  renderImage() {
    const images = this.props.images;
    const index = this.state.selectedImg;
    const currentImg = images[index].node.childImageSharp.fluid;
    const style = {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%"
    }

    console.log(`Image index: ${index}`, currentImg);

    return (
      <Img
        fluid={currentImg}
        // sizes={currentImg}
        title="Hubsy Café"
        alt="Hubsy Café"
        className="gatsby-image-element"
        style={style}
        fadeIn={true}
      />
    )
  }

  render() {
    return (
      <div className={`hero-image ${this.props.class}`}>
        {this.renderImage()}

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