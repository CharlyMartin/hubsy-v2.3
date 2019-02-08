import React from 'react';
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image';

// Components
import Layout from '../components/layout';
import Button from '../components/button';
import A from '../components/a';
import Review from '../components/review';
import Alert from '../components/alert';
import ImageSlider from '../components/image_slider';

// CSS
import '../css/pages/home.css';

// Data
import reviews from '../data/reviews.js';
import links from '../data/external-links.js';
import pages from '../data/internal-links';

// Helpers
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
    return this.props.data.referrals.edges.map(({ node }) => {
      return (
        <A href={links[`${node.name}`]} key={node.name}>
          <Img fixed={node.childImageSharp.fixed} />
        </A>
      )
    });
  }

  render() {    
    const pageContext = this.props.pageContext;
    console.log(this.props.pageContext);

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale} title={pageContext.data.seo_title} description={pageContext.data.seo_description}>
        <div id="home-page" path={pageContext.pathname}>
          
          <ImageSlider class="home-hero" images={this.props.data.banners.edges}>
            {this.renderAlert(pageContext.data)}
          </ImageSlider>

          {/* Brand + Tagline */}
          <div className="container mg-xl-top mg-xxl-bottom">
            <div className="brand-container-top mg-xl-bottom">
              <h1 id="title">{pageContext.data.brand}</h1>
              <Link to={prefixLocale(this.props.pageContext.prefix, pages.shops)}>
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
                <Img fixed={this.props.data.googleLogo.childImageSharp.fixed}/>
              </div>
              
              <div className="reviews">
                <div className="column-layout">
                  {this.renderReviews()}
                </div>
              </div>
              
            </div>
          </div>

          <div className="container text-center mg-xl-bottom">
            <Link to={prefixLocale(this.props.pageContext.prefix, pages.about)}>
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
    googleLogo: file(relativePath: {eq: "icons/google.png"}) {
      childImageSharp {
        fixed(width: 25, height: 25) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    banners: allFile(filter: {name: {regex: "/airtable-home/"}}) {
      edges {
        node {
          id
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`