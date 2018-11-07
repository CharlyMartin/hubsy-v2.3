import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Navbar from './navbar'
import Footer from './footer'

import './layout.css'

// We can now add GraphQL queries to any component in our app (not just page components) using StaticQuery

// page queries can accept variables (via pageContext) but can only be added to page components
// StaticQuery does not accept variables (hence the name “static”), but can be used in any component, including pages

const Layout = (props) => {
  return (
    <div>
      <Helmet
        title={"Hubsy | Café & Coworking"}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}>
        <html lang={props.locale} />
      </Helmet>

      <Navbar locale={props.locale} />
      {props.children}
      <Footer locale={props.locale} />
    </div>
  )
}

export default Layout;

