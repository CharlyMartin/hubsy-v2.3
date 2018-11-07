import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
// import Image from '../components/image'

// Components under src/pages become pages automatically with paths based on their file name.
// For example src/pages/index.jsx is mapped to yoursite.com and src/pages/about.jsx becomes yoursite.com/about/.
// Every .js or .jsx file in the pages directory must resolve to either a string or react component, otherwise your build will fail.

class HomePage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   const locale = this.props.pageContext.locale || 'fr';
  //   const path = this.props.pageContext.locale || '/';

  //   // Index default to home page. Hence, "/" does not have access to 
  //   // pageContext, as it is not created by createPage().
  //   // There's nothing on "/en" so this one is created by createPage().
  //   this.state = {
  //     locale,
  //     path
  //   }
  // }
  
  render() {
    const locale = this.props.pageContext.locale;
    const prefix = this.props.pageContext.prefix;
    // console.log(this.props);
    
    return (
      <Layout locale={locale}>
        <h1>Hi people</h1>
        <h2>This page is in {locale}</h2>
        <p>Welcome to your new Gatsby site.</p>
        {/* <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
          <Image />
        </div> */}
        <Link to={`${prefix}/shops`} >Shops</Link>
      </Layout>
    )
  }
}
  
export default HomePage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
