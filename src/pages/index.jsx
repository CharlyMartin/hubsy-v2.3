import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
// import Image from '../components/image'

// Components under src/pages become pages automatically with paths based on their file name.
// For example src/pages/index.jsx is mapped to yoursite.com and src/pages/about.jsx becomes yoursite.com/about/.
// Every .js or .jsx file in the pages directory must resolve to either a string or react component, otherwise your build will fail.

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    const locale = this.props.pageContext.locale || 'fr';
    const path = this.props.pageContext.locale || '/';

    this.state = {
      locale,
      path
    }
  }
  
  render() {
    
    console.log(this.state.locale);

    return (
      <Layout locale={this.state.locale}>
        <h1>Hi people</h1>
        <h2>This page is in {this.state.locale}</h2>
        <p>Welcome to your new Gatsby site.</p>
        {/* <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
          <Image />
        </div> */}
        <Link to="/shops/">Go to page 2</Link>
      </Layout>
    )
  }
}
  

export default IndexPage
