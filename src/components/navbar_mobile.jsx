import React from 'react';
import { StaticQuery, graphql } from "gatsby";
import { Link } from 'gatsby'

import Image from '../components/image'

import { navbarMobile } from '../utilities/navbar_mobile';

import logo from '../images/logo/logo.png';
import flagFR from '../images/lang/fr.png';
import flagEN from '../images/lang/en.png';
import menu from '../images/icons/menu.png';
import close from '../images/icons/close.png';
import instagram from '../images/icons/instagram.png';

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
      <div className="navbar-mobile">
        <div className="navbar-mobile-top">
          <div id="menu-button">
            <Image src={menu} />
          </div>
        </div>

        <div className="navbar-mobile-content">
          <div className="navbar-mobile-content-border" />
          <div className="navbar-mobile-content-background" />

          {/* CLOSE BUTTON */}
          <div className="corner top-right" id="close-button">
            <Image src={close}/>
          </div>
          
          {/* LANG FLAG */}
          <Link to={this.createLangLink()}>
            <div className="corner bottom-right">
              {this.renderFlag()}
            </div>
          </Link>

          {/* INSTAGRAM */}
          <a rel="noopener noreferrer" href='instagram://user?username={hubsycafe}' target="_blank">
            <div className="corner bottom-left">
              <Image src={instagram}/>
            </div>
          </a>

          <div className="navbar-mobile-content-container">
            <div className="navbar-mobile-content-top">
              <div className="navbar-mobile-element">
                <Link to={this.prefixLocale("about")}>{content.concept}</Link>
              </div>

              <div className="navbar-mobile-element">
                <Link to={this.prefixLocale("pricing")}>{content.pricing}</Link>
              </div>

              <div className="navbar-mobile-element">
                <Link to={this.prefixLocale("rooms")}>{content.booking}</Link>
              </div>

              <div className="navbar-mobile-element" id="navbar-mobile-main">
                <Link to={this.prefixLocale("shops")}>{content.venues}</Link>
              </div>
            </div>

            <div className="navbar-mobile-content-bottom">
              <div className="navbar-mobile-element">
                <Link to={this.prefixLocale("")}>{content.home}</Link>
              </div>

              <div className="navbar-mobile-element">
                <a href="https://blog.hubsy.fr/" target="_blank" rel="noopener noreferrer">{content.blog}</a>
              </div>

              <div className="navbar-mobile-element">
                <a href="https://shop.hubsy.fr/" target="_blank" rel="noopener noreferrer">{content.coffee}</a>
              </div>

              <div className="navbar-mobile-element">
                <Link to={this.prefixLocale("barista-training")}>{content.barista}</Link>
              </div>

            </div>
          </div>
          {/* End of Navbar-mobile-content-container */}

        </div>  
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