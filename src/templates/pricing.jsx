import React from 'react';
// import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

// import '../css/pages/home.css'

class PricingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: this.props.pageContext.locale,
      prefix: this.props.pageContext.prefix,
      static: this.props.pageContext.data
    }
  }

  prefixLocale(path) {
    return `${this.state.prefix}${path}`;
  }
  
  render() {    
    return (
      <Layout prefix={this.state.prefix} locale={this.state.locale}>
        <div className="container container-margin">
          <h1>{this.state.static.title}</h1>
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
