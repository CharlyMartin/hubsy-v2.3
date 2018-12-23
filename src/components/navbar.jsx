import React from 'react';
import { StaticQuery, graphql } from "gatsby";
import { Link } from 'gatsby'

import Image from './image';

import logo from '../images/logo/logo.png';
import flagFR from '../images/lang/fr.png';
import flagEN from '../images/lang/en.png';
import caret from '../images/icons/caret.png';
import menu from '../images/icons/menu.png';

import { navbarDropdown } from '../utilities/navbar_dropdown';

import links from '../data/external-links';

import '../css/components/navbar.css';



class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  renderFlag() {
    if (this.props.locale === 'fr') return (<Image src={flagFR} /> );
    if (this.props.locale === 'en') return (<Image src={flagEN} /> );
  }

  prefixLocale(path) {
    return `${this.props.prefix}${path}`;
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
      <div>
        <div className="navbar">
          <div className="navbar-flex-container">

              <div className="navbar-side" id="navbar-left">
                <div className="navbar-element">
                  <Link to={this.prefixLocale("shops")}>{content.venues}</Link>
                </div>

                <div className="navbar-element">
                  <Link to={this.prefixLocale("about")}>{content.concept}</Link>
                </div>

                <div className="navbar-element">
                  <Link to={this.prefixLocale("pricing")}>{content.pricing}</Link>
                </div>

                <div className="navbar-element">
                  <Link to={this.prefixLocale("rooms")}>{content.booking}</Link>
                  

                  <div className="navbar-dropdown" id="booking">
                    <Link to={this.prefixLocale("rooms")}>
                      <div className="navbar-dropdown-item">
                        <h3>{content.book}</h3>
                        <p className="text-small">{content.book_text}</p>
                      </div>
                    </Link>

                    <a href={links.privatise_form} target="_blank" rel="noopener noreferrer">
                      <div className="navbar-dropdown-item">
                        <h3>{content.privatize}</h3>
                        <p className="text-small">{content.privatize_text}</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="navbar-logo">
                <Link to={this.prefixLocale("")}>
                  <Image src={logo} />
                </Link>
              </div>

              <div className="navbar-menu" id="menu-button">
                <Image src={menu} />
              </div>

              <div className="navbar-side" id="navbar-right">

                <div className="navbar-side-container">
                  <span className="navbar-element">
                    <Link to={this.prefixLocale("barista-training")}>{content.barista}</Link>
                  </span>

                  <span className="navbar-element">
                    <a href={links.shopify} target="_blank" rel="noopener noreferrer">{content.coffee}</a>
                  </span>

                  <span className="navbar-element">
                    <a href={links.blog} target="_blank" rel="noopener noreferrer">{content.blog}</a>
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


// class Navbar extends React.Component {
//   constructor(props) {
//     super(props);
//     content = {
//       fr: {},
//       en: {}
//     }
//   }
  
//   componentDidMount() {
//     var Airtable = require('airtable');
//     var base = new Airtable({apiKey: 'key7nPLJ4faTkoF4S'}).base('appjg3ShOoZQxtkqi');

//     base('navbar').select({maxRecords: 10,})
//       .eachPage(function page(records) {
//         records.forEach(function(record) {
//         console.log(record.fields);

//         record.fields.language === 'en' ? this.setState({en: record.fields}) : null;
//     });

//     // this.setState({content: "new content"});
//     });
//   }

//   render() {
//     return (
//       <h1>This is a Navbar in</h1>
//     )
//   }
// }

// export default Navbar;

// function filterObjects(array, lang = 'fr') {
//   // Components are called internally during the build sequence,
//   // making locale = undefined which returns an empty object and fail the build.
//   // The default params 'fr' prevents that!
//   // console.log(array, lang);
//   return array.filter(obj => obj.node.data.language === lang);
// }

