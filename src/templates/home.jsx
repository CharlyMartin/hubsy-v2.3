import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

// Components under src/pages become pages automatically with paths based on their file name.
// For example src/pages/index.jsx is mapped to yoursite.com and src/pages/about.jsx becomes yoursite.com/about/.
// Every .js or .jsx file in the pages directory must resolve to either a string or react component, otherwise your build will fail.

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    // Index default to home page. Hence, "/" does not have access to 
    // pageContext, as it is not created by createPage().
    // There's nothing on "/en" so this one is created by createPage().
    this.state = {
      images: this.props.pageContext.data.pictures,
      selectedImage: this.props.pageContext.data.pictures[0]
    }
  }
  
  render() {
    const context = this.props.pageContext;
    console.log(context);
    
    return (
      <Layout locale={context.locale}>
        <img src={this.state.selectedImage.url} alt="Hero banner Hubsy Café" />
        <h1>{context.data.brand}</h1>
        <h2>{context.data.caption}</h2>
        <p>This page is in {context.locale}</p>

        {/* <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
          <Image />
        </div> */}

        <Link to={`${context.prefix}/shops`} >Shops</Link>
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
