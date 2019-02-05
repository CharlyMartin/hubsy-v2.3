import React from 'react';
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image';

// Components
import Layout from '../components/layout';
import Button from '../components/button';
import Image from '../components/image';
import Review from '../components/review';
import Alert from '../components/alert';
import HeroImage from '../components/hero_image';

// Images
// import leParisien from '../images/referrals/le_parisien.png';
// import timeout from '../images/referrals/timeout.png';
// import tf1 from '../images/referrals/tf1.png';
// import telerama from '../images/referrals/telerama.png';
// import forbes from '../images/referrals/forbes.png';
import google from '../images/icons/google.png';

// CSS
import '../css/pages/home.css';
import '../css/components/hero_image.css';

// Data
import reviews from '../data/reviews.js';
import links from '../data/external-links.js';
import pages from '../data/internal-links';

// Functions
import { sample, textEllipsis, prefixLocale } from '../helpers/functions';

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
      reviews: sample(this.filterReviews(), 3)
    }
  }

  filterReviews() {
    return reviews.filter(r => r.language === this.props.pageContext.locale);
  }

  renderReviews() {
    return this.state.reviews.map(r => {
      const clippedContent = textEllipsis(r.content);
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

  renderReferrals() {
    return this.props.data.referrals.edges.map((obj) => {
      return (
        <a href={links[`${obj.node.name}`]} target="_blank" rel="noopener noreferrer" key={obj.node.name}>
          <Img fixed={obj.node.childImageSharp.fixed} />
        </a>
      )
    });
  }

  render() {    
    const pageContext = this.props.pageContext;
    const prefix = this.props.pageContext.prefix;

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
              <Link to={prefixLocale(prefix, pages.shops.path)}>
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
              <p className="mg-xl-bottom testimonials-subtitle">{pageContext.data.google_reviews}</p>
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
            <Link to={prefixLocale(prefix, pages.about.path)}>
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
              {this.renderReferrals()}
            </div>
          </div>

        </div>
      </Layout>
    )
  }
}
  
export default HomePage;

export const query = graphql`
  query homePageQuery {
    referrals: allFile(filter: {relativeDirectory: {eq: "referrals"}}) {
      edges {
        node {
          name
          childImageSharp {
            fixed(width: 90) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
