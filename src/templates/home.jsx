import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

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

        <img src={this.state.selectedImage.url} alt="Hero banner Hubsy Café" />
        
        <div className="container">
          <h1>{this.state.data.brand}</h1>
          <h2>{this.state.data.caption}</h2>
          <p>This page is in {this.state.locale}</p>
          <Link to={this.prefixLocale("/shops")} >Shops</Link>
        </div>
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
