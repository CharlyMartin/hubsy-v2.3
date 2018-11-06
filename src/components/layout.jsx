import React from 'react'
// import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
// import { StaticQuery, graphql } from 'gatsby'

import Navbar from './navbar'
import Footer from './footer'

import './layout.css'
// import { dim } from 'ansi-colors';

// We can now add GraphQL queries to any component in our app (not just page components) using StaticQuery

// page queries can accept variables (via pageContext) but can only be added to page components
// StaticQuery does not accept variables (hence the name “static”), but can be used in any component, including pages

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div>
        {/* {console.log(this.props)} */}
        
        <Helmet
          title={"Hubsy | Café & Coworking"}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}>
          <html lang="en" />
        </Helmet>
  
        <Navbar locale={this.props.locale} />
        {this.props.children}
        <Footer locale={this.props.locale} />
      </div>
    )
  }
}

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// }

export default Layout