import React from 'react';
import { Link } from 'gatsby'

// Components
import Layout from '../components/layout';
import Button from '../components/button';
import Image from '../components/image';
import Review from '../components/review';
import Alert from '../components/alert';
import HeroImage from '../components/hero_image';

// Images
import leParisien from '../images/referrals/le_parisien.png';
import timeout from '../images/referrals/timeout.png';
import tf1 from '../images/referrals/tf1.png';
import telerama from '../images/referrals/telerama.png';
import forbes from '../images/referrals/forbes.png';
import google from '../images/icons/google.png';

// CSS
import '../css/pages/home.css';
import '../css/components/hero_image.css';

// Data
import reviews from '../data/reviews.js';
import links from '../data/external-links.js';
import pages from '../data/internal-links';

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
      reviews: this.sample(this.filterReviews(), 3)
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

  textEllipsis(str, limit = 110) {
    if (str.length > limit) return (`${str.substring(0, limit - 1).trim()}...`);
    return str
  }

  renderReviews() {
    return this.state.reviews.map(r => {
      const clippedContent = this.textEllipsis(r.content);
      return (
        <div className="column-third" key={r.id}>
          <Review first={r.first} content={clippedContent} />
        </div>
      )
    })
  }

  renderAlert(data) {
    return (
      data.alert === "true" ? <Alert content={data.alert_message}/> : <div />
    )
  }

  render() {    
    const pageContext = this.props.pageContext;
    // const images = this.formatImages(pageContext.data.pictures);

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale} title={pageContext.data.seo_title} description={pageContext.data.seo_description}>
        <div id="home-page" path={pageContext.pathname}>

          <HeroImage class="home-hero image-centered" images={pageContext.data.pictures}>
            {this.renderAlert(pageContext.data)}
          </HeroImage>

          {/* Brand + Tagline */}
          <div className="container mg-xl-top mg-xxl-bottom">
            <div className="brand-container-top mg-xl-bottom">
              <h1 id="title">{pageContext.data.brand}</h1>
              <Link to={this.prefixLocale(pages.shops.path)}>
                <Button class="button-beige" text={pageContext.data.button} />
              </Link>
            </div>
            <h2 id="caption">{pageContext.data.caption}</h2>
          </div>

          <br />
          <br />
          
          {/* Google Reviews */}
          <div className="wrapper-beige testimonials text-center mg-xl-bottom">
            <div className="container pd-xxl-top pd-xxl-bottom">
              <h3>{pageContext.data.testimonials}</h3>
              <p className="mg-xl-bottom testimonials-subtitle">{pageContext.data.google}</p>
              <div id="google">
                <Image src={google} />
              </div>
              
              <div className="reviews">
                <div className="column-layout">
                  {this.renderReviews()}
                </div>
              </div>
              
            </div>
          </div>

          <div className="container text-center mg-xl-bottom">
            <Link to={this.prefixLocale(pages.about.path)}>
              <Button class="button-beige-transparent" text={pageContext.data.concept} />
            </Link>
          </div>

          <br/>
          <br/>
          <br/>

          {/* Company Referrals */}
          <div className="container text-center">
            <h3 className="mg-xl-bottom">{pageContext.data.referrals}</h3>

            <div className="referrals">
              <a href={links.timeout} target="_blank" rel="noopener noreferrer">
                <Image src={timeout} />
              </a>

              <a href={links.tf1} target="_blank" rel="noopener noreferrer">
                <Image src={tf1} />
              </a>

              <a href={links.forbes} target="_blank" rel="noopener noreferrer">
                <Image src={forbes} />
              </a>

              <a href={links.le_parisien} target="_blank" rel="noopener noreferrer">
                <Image src={leParisien} />
              </a>

              <a href={links.telerama} target="_blank" rel="noopener noreferrer">
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
