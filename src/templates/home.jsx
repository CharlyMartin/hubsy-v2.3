import React from 'react';
// import { Link, graphql } from 'gatsby'

// Components
import Layout from '../components/layout';
import ButtonLink from '../components/button_link';
import Image from '../components/image';
import CardReview from '../components/card_review';

// Images
import leParisien from '../images/referrals/le_parisien.png';
import timeout from '../images/referrals/timeout.png';
import tf1 from '../images/referrals/tf1.png';
import telerama from '../images/referrals/telerama.png';
import forbes from '../images/referrals/forbes.png';

// CSS
import '../css/pages/home.css';

// Reviews Data
import reviews from '../data/reviews.js';

// Components under src/pages become pages automatically with paths based on their file name.
// For example src/pages/index.jsx is mapped to yoursite.com and src/pages/about.jsx becomes yoursite.com/about/.
// Every .js or .jsx file in the pages directory must resolve to either a string or react component, otherwise your build will fail.

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    // Index default to root url. Hence, "/" does not have access to 
    // pageContext, as it is not created by createPage().
    // There's data on "/en" as this one is created by createPage().
    this.state = {
      images: this.props.pageContext.data.pictures,
      selectedImage: this.props.pageContext.data.pictures[0],
    }
  }

  prefixLocale(path) {
    return `${this.props.pageContext.prefix}${path}`;
  }

  filterReviews() {
    return reviews.filter(r => r.language === this.props.pageContext.locale);
  }

  sample(arr, number) {
    // Shuffling array
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    
    // Return the x first items
    return arr.slice(0, number);
  }

  textEllipsis(str, limit) {
    if (str.length > limit) return (`${str.substring(0, limit - 1).trim()}...`);
    return str
  }

  renderReviews() {
    const reviews = this.sample(this.filterReviews(), 3);
    return reviews.map(r => {
      const clippedContent = this.textEllipsis(r.content, 110);
      return (
        <div className="column-third pd-md" key={r.id}>
          <CardReview first={r.first} content={clippedContent} />
        </div>
      )
    })
  }
  
  render() {    
    const pageContext = this.props.pageContext;
    const backgroundImage = { backgroundImage: `url(${this.state.selectedImage.url})`};
    console.log(pageContext);

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
        <div path="">
          <div className="home-hero image-centered" style={backgroundImage} />

          {/* Brand + Tagline */}
          <div className="container mg-xxl-top-bottom">
            <div className="brand-container-top mg-xl-bottom">
              <h1 id="title">{pageContext.data.brand}</h1>
              <ButtonLink class="button-beige" path={this.prefixLocale("shops")} text={pageContext.data.button} />
            </div>
            <h2 id="caption">{pageContext.data.caption}</h2>
          </div>

          <br />
          <br />
          <br />
          <br />
          
          {/* Google Reviews */}
          <div className="wrapper-beige text-center">
            <div className="container pd-xxl-top pd-xxl-bottom">
              <h3 className="mg-xl-bottom">{pageContext.data.testimonials}</h3>
              
              <div className="reviews">
                <div className="column-layout">
                  {this.renderReviews()}
                </div>
              </div>
              
            </div>
          </div>

          <br />
          <br />

          <div className="container text-center mg-xl-bottom">
            <ButtonLink class="button-beige-transparent" path={this.prefixLocale("about")} text={pageContext.data.concept} />
          </div>

          <br />
          <br />
          <br />
          <br />

          {/* Company Referrals */}
          <div className="container text-center">
            <h3 className="mg-xl-bottom">{pageContext.data.referrals}</h3>

            <div className="referrals">
              <a href="https://www.timeout.fr/paris/bars/hubsy" target="_blank" rel="noopener noreferrer">
                <Image src={timeout} />
              </a>

              <a href="https://vimeo.com/153919166#t=NaNs" target="_blank" rel="noopener noreferrer">
                <Image src={tf1} />
              </a>

              <a href="https://www.forbes.fr/management/les-tiers-lieux-s-imposent/" target="_blank" rel="noopener noreferrer">
                <Image src={forbes} />
              </a>

              <a href="http://www.leparisien.fr/paris-75/paris-75003/husby-reinvente-le-cafe-bureau-partage-pour-la-generation-y-a-paris-06-01-2016-5426597.php" target="_blank" rel="noopener noreferrer">
                <Image src={leParisien} />
              </a>

              <a href="https://sortir.telerama.fr/paris/lieux/bars/hubsy-cafe,28001.php" target="_blank" rel="noopener noreferrer">
                <Image src={telerama} />
              </a>
            </div>
          </div>

        </div>
      </Layout>
    )
  }
}
  
export default HomePage;
