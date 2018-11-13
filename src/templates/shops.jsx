import React from 'react';
// import { Link, graphql } from 'gatsby'

import Layout from '../components/layout';

// import '../css/pages/home.css'

class ShopsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // images: this.props.pageContext.data.pictures,
      // selectedImage: this.props.pageContext.data.pictures[0],
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
      <Layout prefix={this.state.prefix} locale={this.state.locale}>
        <div className="container container-margin">
          <h1>{this.state.data.title}</h1>
        </div>
      </Layout>
    )
  }
}
  
export default ShopsPage;

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
