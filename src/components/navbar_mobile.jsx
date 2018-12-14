import React from 'react';
import { StaticQuery, graphql } from "gatsby";
import { Link } from 'gatsby'

import Image from '../components/image'

import { navbarMobile } from '../utilities/navbar_mobile';

// import logo from '../images/logo/logo.png';
import flagFR from '../images/lang/fr.png';
import flagEN from '../images/lang/en.png';
import instagram from '../images/icons/instagram.png';

import links from '../data/links';

import '../css/components/navbar_mobile.css';



class NavbarMobile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    navbarMobile();
  }

  renderFlag() {
    if (this.props.locale === 'fr') return (<Image src={flagEN} /> );
    if (this.props.locale === 'en') return (<Image src={flagFR} /> );
  }

  createLangLink() {
    if (this.props.locale === 'fr') return `/en/${this.props.path}`;
    if (this.props.locale === 'en') return `/${this.props.path}`;
  }

  prefixLocale(path) {
    return `${this.props.prefix}${path}`;
  }

  filterObjects(array, lang = 'fr') {
    return array.filter(obj => obj.node.data.language === lang);
  }
  
  render() {
    // console.log(this.props);
    const edges = this.props.data.allAirtable.edges;
    const array = this.filterObjects(edges, this.props.locale);
    const content = array[0].node.data;

    return (
      <div className="mobile">

        <div className="mobile-content">
          {/* <div className="mobile-content-border" /> */}
          <div className="mobile-background" />
          <div className="mobile-content-container">
            <div className="mobile-content-main">
              <Link to={this.prefixLocale("about")}>
                <div className="mobile-element">
                  {content.concept}
                </div>
              </Link>

              <Link to={this.prefixLocale("pricing")}>
                <div className="mobile-element">
                  {content.pricing}
                </div>
              </Link>

              <Link to={this.prefixLocale("rooms")}>
                <div className="mobile-element">
                  {content.booking}
                </div>
              </Link>

              <Link to={this.prefixLocale("shops")}>
                <div className="mobile-element" id="mobile-main">
                  {content.venues}
                </div>
              </Link>

              <Link to={this.prefixLocale("barista-training")}>
                <div className="mobile-element">
                  {content.barista}
                </div>
              </Link>

              <a href={links.blog} target="_blank" rel="noopener noreferrer">
                <div className="mobile-element">
                  {content.blog}
                </div>
              </a>

              <a href={links.shopify} target="_blank" rel="noopener noreferrer">
                <div className="mobile-element">
                  {content.coffee}
                </div>
              </a>
            </div>

            <div className="mobile-links">
              {/* LANG FLAG */}
              <Link to={this.createLangLink()}>
                <div className="square">
                  {this.renderFlag()}
                </div>
              </Link>

              {/* INSTAGRAM */}
              <a rel="noopener noreferrer" href={links.ig_mobile} target="_blank">
                <div className="square">
                  <Image src={instagram}/>
                </div>
              </a>
            </div>

          </div>
          {/* End of Navbar-mobile-content-container */}
        </div>

        <div className="mobile-right" id="close"/>
      </div>
    )
  }
}



export default (props) => {
  return (<StaticQuery
    query={graphql`
      query {
        allAirtable(filter: {table: {eq: "navbar"}}) {
          edges {
            node {
              data {
                venues
                booking
                book
                book_text
                privatize
                privatize_text
                pricing
                concept
                blog
                coffee
                barista
                language
                home
              }
            }
          }
        }
      }  
    `
    }

    render={(data) => {
      return (
        <NavbarMobile data={data} locale={props.locale} prefix={props.prefix} path={props.path} />
      )}
    }
  />)
}