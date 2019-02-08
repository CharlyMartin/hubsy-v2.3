// Librairies
import React from 'react';
import { StaticQuery, graphql } from "gatsby";
import { Link } from 'gatsby'

// Components
import Image from './image';
import A from './a';

// Images
import logo from '../images/logo/logo.png';
import flagFR from '../images/lang/fr.png';
import flagEN from '../images/lang/en.png';
import caret from '../images/icons/caret.png';
import menu from '../images/icons/menu.png';

// Utilities
import { navbarDropdown } from '../utilities/navbar_dropdown';

// Data
import links from '../data/external-links';
import pages from '../data/internal-links';

// CSS
import '../css/components/navbar.css';

// Helpers
import { prefixLocale } from '../helpers/functions';



class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  renderFlag() {
    if (this.props.locale === 'fr') return (<Image src={flagFR} /> );
    if (this.props.locale === 'en') return (<Image src={flagEN} /> );
  }

  filterObjects(array, lang = 'fr') {
    return array.filter(obj => obj.node.data.language === lang);
  }

  componentDidMount() {
    navbarDropdown();
  }
  
  render() {
    const edges = this.props.data.allAirtable.edges;
    const array = this.filterObjects(edges, this.props.locale);
    const content = array[0].node.data;

    return (
      <div className="navbar-component">
        <div className="navbar">
          <div className="navbar-flex-container">

              <div className="navbar-side" id="navbar-left">
                <div className="navbar-element">
                  <Link to={prefixLocale(this.props.prefix, pages.shops)}>{content.venues}</Link>
                </div>

                <div className="navbar-element">
                  <Link to={prefixLocale(this.props.prefix, pages.about)}>{content.concept}</Link>
                </div>

                <div className="navbar-element">
                  <Link to={prefixLocale(this.props.prefix, pages.pricing)}>{content.pricing}</Link>
                </div>
                
                {/* Dropdown is desactivated, no class with dropdown */}
                <div className="navbar-element"> 
                  <Link to={prefixLocale(this.props.prefix, pages.rooms)}>{content.booking}</Link>
                  

                  <div className="navbar-dropdown" id="booking">
                    <Link to={prefixLocale(this.props.prefix, pages.rooms)}>
                      <div className="navbar-dropdown-item">
                        <h3>{content.book}</h3>
                        <p className="text-small">{content.book_text}</p>
                      </div>
                    </Link>

                    <A href={links.privatise_form}>
                      <div className="navbar-dropdown-item">
                        <h3>{content.privatize}</h3>
                        <p className="text-small">{content.privatize_text}</p>
                      </div>
                    </A>
                  </div>
                </div>
              </div>

              <div className="navbar-logo">
                <Link to={prefixLocale(this.props.prefix, pages.home)}>
                  <Image src={logo} />
                </Link>
              </div>

              <div className="navbar-menu" id="menu-button">
                <Image src={menu} />
              </div>

              <div className="navbar-side" id="navbar-right">

                <div className="navbar-side-container">
                  <span className="navbar-element">
                    <Link to={prefixLocale(this.props.prefix, pages.barista)}>{content.barista}</Link>
                  </span>

                  <span className="navbar-element">
                    <A href={links.shopify}> {content.coffee} </A>
                  </span>

                  <span className="navbar-element">
                    <A href={links.blog}> {content.blog} </A>
                  </span>

                  <div className="navbar-language with-dropdown">
                    {this.renderFlag()}
                    <Image src={caret} />

                    <span className="navbar-dropdown" id="lang-selection">
                      <Link to={`/${this.props.path}`}>
                        <div className="navbar-dropdown-item navbar-dropdown-item-flex" data-id="fr" onClick={this.handleClick}>
                          {/* {<FlagFR />} */}
                          <Image src={flagFR} />
                          <p>Français</p>
                        </div>
                      </Link>

                      <Link to={`/en/${this.props.path}`}>
                        <div className="navbar-dropdown-item navbar-dropdown-item-flex" data-id="en" onClick={this.handleClick}>
                          {/* {<FlagEN />} */}
                          <Image src={flagEN} />
                          <p>English</p>
                        </div>
                      </Link>
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>

        <div className="navbar-placeholder" ></div>
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
        <Navbar data={data} locale={props.locale} prefix={props.prefix} path={props.path} />
      )}
    }
  />)
}

