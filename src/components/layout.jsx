import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Navbar from './navbar';
import Footer from './footer';

import meta from '../data/meta';

import '../css/global.css';
import image from '../images/hubsy.jpg';

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
        console.log(props);
        return (
          <div>
            <Helmet title={`${props.children.props.title[props.locale]} | ${meta[props.locale].title}`}>
              {/* Already done by Gatsby */}
              {/* <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" /> */}

              <html lang={props.locale} />
              <meta name="description" content={meta[props.locale].description} />
              <meta name="keywords" content={meta[props.locale].keywords} />

              <meta property="og:url"           content={meta[props.locale].facebook.url} />
              <meta property="og:type"          content="website" />
              <meta property="og:locale"        content={meta[props.locale].facebook.locale} />
              <meta property="og:site_name"     content={meta[props.locale].facebook.title} />
              <meta property="og:title"         content={meta[props.locale].facebook.title} />
              <meta property="og:description"   content={meta[props.locale].facebook.description} />
              <meta property="og:image"         content={image} />
              <meta property="og:image:width"   content="1200" />
              <meta property="og:image:height"  content="800" />
            </Helmet>

            <Navbar locale={props.locale} prefix={props.prefix} path={props.children.props.path} />
            {props.children}
            <Footer locale={props.locale} prefix={props.prefix} />
          </div>
        )}
      }
    />
  )
}

// export default Layout;

