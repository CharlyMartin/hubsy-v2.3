import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Navbar from './navbar';
import Footer from './footer';

import '../css/global.css';

// We can now add GraphQL queries to any component in our app (not just page components) using StaticQuery

// page queries can accept variables (via pageContext) but can only be added to page components
// StaticQuery does not accept variables (hence the name “static”), but can be used in any component, including pages

export default (props) => {
  return (
    <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
      
      render={(data) => {

        return (
          <div>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
              ]}>
              <html lang={props.locale} />
            </Helmet>

            <Navbar locale={props.locale} prefix={props.prefix}/>
            {props.children}
            <Footer locale={props.locale} prefix={props.prefix}/>
          </div>
        )}
      }
    />
  )
}

// export default Layout;

