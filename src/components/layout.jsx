import React from 'react';
import Helmet from 'react-helmet';
// import { StaticQuery, graphql } from 'gatsby';

import Navbar from './navbar';
import NavbarMobile from './navbar_mobile';
import Footer from './footer';

import meta from '../data/meta';
import { fadeinImages } from '../utilities/fadein_images';

import '../css/global.css';
import image from '../images/hubsy.jpg';

// We can now add GraphQL queries to any component in our app (not just page components) using StaticQuery

// page queries can accept variables (via pageContext) but can only be added to page components
// StaticQuery does not accept variables (hence the name “static”), but can be used in any component, including pages

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    fadeinImages();
  }

  render() {
    const locale = this.props.locale;
    const prefix = this.props.prefix;
    const path = this.props.children.props.path;
    const title = "Hubsy | Café & Coworking";

    return (
      <div>
        <Helmet title={title}>
          {/* Already done by Gatsby */}
          {/* <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" /> */}

          <html lang={locale} />
          <meta name="description" content={meta[locale].description} />
          <meta name="keywords" content={meta[locale].keywords} />

          <meta property="og:url"           content={meta[locale].facebook.url} />
          <meta property="og:type"          content="website" />
          <meta property="og:locale"        content={meta[locale].facebook.locale} />
          <meta property="og:site_name"     content={meta[locale].facebook.title} />
          <meta property="og:title"         content={meta[locale].facebook.title} />
          <meta property="og:description"   content={meta[locale].facebook.description} />
          <meta property="og:image"         content={image} />
          <meta property="og:image:width"   content="1200" />
          <meta property="og:image:height"  content="800" />
        </Helmet>

        <Navbar locale={locale} prefix={prefix} path={path}/>
        <NavbarMobile locale={locale} prefix={prefix} path={path}/>
        {this.props.children}
        <Footer locale={locale} prefix={prefix} />
      </div>
    )
  }
}

export default Layout;

// export default (props) => {
//   return (
//     <StaticQuery
//       query={graphql`
//         query HeadingQuery {
//           site {
//             siteMetadata {
//               title
//             }
//           }
//         }
//       `}
      
//       render={() => {
//         }
//       }
//     />
//   )
// }

// export default Layout;

