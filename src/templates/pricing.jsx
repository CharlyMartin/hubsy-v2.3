import React from 'react';
// import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

import '../css/pages/pricing.css'

class PricingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  prefixLocale(path) {
    return `${this.props.pageContext.prefix}${path}`;
  }
  
  render() {
    const pageContext = this.props.pageContext;

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
        <div className="container mg-xxl-top-bottom">
          <div className="page-header">
            <h1>{pageContext.data.title}</h1>
            <h3>{pageContext.data.subtitle}</h3>
          </div>

          <div className="page-section mg-xxl-top">
            <div className="column-layout">
              
              <div className="column-half pd-lg-right">
                <div className="price-table" id="main">
                  <h2>Test</h2>
                </div>
              </div>

              <div className="column-half pd-lg-left">
                <div className="price-table" id="secondary">
                  <h2>Test</h2>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
  
export default PricingPage;

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
