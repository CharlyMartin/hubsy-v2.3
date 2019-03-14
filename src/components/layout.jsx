// Librairies
import React from 'react';
import Helmet from 'react-helmet';
import {graphql} from 'gatsby';

// Components
import Navbar from './navbar';
import NavbarMobile from './navbar_mobile';
import Footer from './footer';

// Data
import meta from '../data/meta';

// CSS
import '../css/global.css';

// Images
import image from '../images/hubsy.jpg';

// We can now add GraphQL queries to any component in our app (not just page components) using StaticQuery
// page queries can accept variables (via pageContext) but can only be added to page components
// StaticQuery does not accept variables (hence the name “static”), but can be used in any component, including pages

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  // renderTagManagerHead() {
  //   return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-N98GSNQ');`
  // }

  render() {
    const locale = this.props.locale;
    const prefix = this.props.prefix;
    const path = this.props.children.props.path;

    return (
      <div>
        <Helmet title={this.props.title}>
          {/* Already done by Gatsby */}
          {/* <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" /> */}
          
          {/* <script>{this.renderTagManagerHead()}</script> */}
          {/* <script dangerouslySetInnerHTML={this.googleTagManagerHead()}></script> */}

          <html lang={locale} />
          <meta name="description" content={this.props.description} />

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
        
        {/* Google Tag Manager Body */}
        {/* <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N98GSNQ" style={{display: 'none', visibility: 'hidden', height: '0', width: '0'}} />
        </noscript> */}
        
        <Navbar locale={locale} prefix={prefix} path={path}/>
        <NavbarMobile locale={locale} prefix={prefix} path={path}/>
        {this.props.children}
        <Footer locale={locale} prefix={prefix} />
      </div>
    )
  }
}

export const query = graphql`
  fragment HeroImageFuild on File {
    childImageSharp {
      fluid(maxWidth: 1000, quality: 100) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
`

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

