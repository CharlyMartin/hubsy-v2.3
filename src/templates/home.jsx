import React from 'react';
// import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import ButtonLink from '../components/button_link'
import LeParisien from '../components/images/le_parisien'
import Timeout from '../components/images/timeout'
import Tf1 from '../components/images/tf1'
import Telerama from '../components/images/telerama'

import '../css/pages/home.css'

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
  
  render() {    
    const bannerStyle = { backgroundImage: `url(${this.state.selectedImage.url})`};
    const pageContext = this.props.pageContext;

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
        <div>
          <div className="hero" style={bannerStyle} />

            <div className="container container-margin">

              <div className="brand-container">
                <div className="brand-container-top">
                  <h1 id="title">{pageContext.data.brand}</h1>
                  <ButtonLink class="button-beige" path={this.prefixLocale("shops")} content={pageContext.data.button} />
                </div>
                <h2 id="caption">{pageContext.data.caption}</h2>
              </div>

              <br />

              <div className="referral-container">
                <div className="referral-container-top">
                  <h3>{pageContext.data.referrals}</h3>
                </div>

                <div className="referral-container-images">
                  <a href="https://www.timeout.fr/paris/bars/hubsy" target="_blank" rel="noopener noreferrer">
                    <Timeout />
                  </a>

                  <a href="https://vimeo.com/153919166#t=NaNs" target="_blank" rel="noopener noreferrer">
                    <Tf1 />
                  </a>

                  <a href="https://sortir.telerama.fr/paris/lieux/bars/hubsy-cafe,28001.php" target="_blank" rel="noopener noreferrer">
                    <Telerama />
                  </a>

                  <a href="http://www.leparisien.fr/paris-75/paris-75003/husby-reinvente-le-cafe-bureau-partage-pour-la-generation-y-a-paris-06-01-2016-5426597.php" target="_blank" rel="noopener noreferrer">
                    <LeParisien />
                  </a>
                </div>

                <div className="referral-container-button">
                  <ButtonLink class="button-green" path={this.prefixLocale("concept")} content={pageContext.data.concept} />
                </div>

              </div>
            </div>

            <br />
            <br />
          </div>
      </Layout>
    )
  }
}
  
export default HomePage;
