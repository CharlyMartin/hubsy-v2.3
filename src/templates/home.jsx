import React from 'react';
// import { Link, graphql } from 'gatsby'

import { ButtonLink } from '../components/button_link'
import Layout from '../components/layout'

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
      locale: this.props.pageContext.locale,
      prefix: this.props.pageContext.prefix,
      data: this.props.pageContext.data
    }
  }

  prefixLocale(path) {
    return `${this.state.prefix}${path}`;
  }
  
  render() {    
    return (
      <Layout
        prefix={this.state.prefix}
        locale={this.state.locale}>

      <div>
        <div
          className="hero"
          style={{ backgroundImage: `url(${this.state.selectedImage.url})` }} />

          <div className="container container-margin">

            <div className="brand-container">
              <div className="brand-container-top">
                <h1 id="title">{this.state.data.brand}</h1>
                <ButtonLink class="button-beige" path="/shops" content={this.state.data.button} />
              </div>
              <h2 id="caption">{this.state.data.caption}</h2>
            </div>

            <br />

            <div className="referral-container">
              <div className="referral-container-top">
                <h3>{this.state.data.referrals}</h3>
              </div>

              <div className="referral-container-images">
                <a href="https://www.timeout.fr/paris/bars/hubsy" target="_blank" rel="noopener noreferrer">
                  {/* <img src={timeout} alt="" /> */}
                </a>

                <a href="https://vimeo.com/153919166#t=NaNs" target="_blank" rel="noopener noreferrer">
                  {/* <img src={tf1} alt="" /> */}
                </a>

                <a href="https://sortir.telerama.fr/paris/lieux/bars/hubsy-cafe,28001.php" target="_blank" rel="noopener noreferrer">
                  {/* <img src={telerama} alt="" /> */}
                </a>

                <a href="http://www.leparisien.fr/paris-75/paris-75003/husby-reinvente-le-cafe-bureau-partage-pour-la-generation-y-a-paris-06-01-2016-5426597.php" target="_blank" rel="noopener noreferrer">
                  {/* <img src={parisien} alt="" /> */}
                </a>
              </div>

              <div className="referral-container-button">
                <ButtonLink class="button-green" path="/concept" content={this.state.data.concept} />
              </div>


            </div>
          </div>

          <br />
          <br />
          <br />
        </div>
        
        {/* <div className="container">
          <h1>{this.state.data.brand}</h1>
          <h2>{this.state.data.caption}</h2>
          <p>This page is in {this.state.locale}</p>
          <Link to={this.prefixLocale("/shops")} >Shops</Link>
        </div> */}
      </Layout>
    )
  }
}
  
export default HomePage;

// Two sources of data for this component:
// - props.pageContext => coming from the createPage() action in gatsby-node
// - props.data => coming from the page Query below


// export const query = graphql`
//   {
//     allAirtable(filter: {table: {eq: "navbar"}}) {
//       edges {
//         node {
//           data {
//             brand
//             caption
//             button
//             referrals
//             pictures {
//               url
//             }
//             concept
//             language
//           }
//         }
//       }
//     }
//   }
// `
