import React from 'react';
import { StaticQuery, graphql } from "gatsby";
import { Link } from 'gatsby'

import Logo from './images/logo';
import FlagFR from './images/flag_fr';
import FlagEN from './images/flag_en';
import '../css/components/navbar.css';



class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  renderFlag(lang) {
    if (lang === 'fr') return <FlagFR/>;
    if (lang === 'en') return <FlagEN/>;
  }

  extractObject(array, lang = 'fr') {
    // Components are called internally during the build sequence,
    // making locale = undefined which returns an empty object and fail the build.
    // The default params 'fr' prevents that!
    // console.log(array, lang);
    return array.filter(obj => obj.node.data.language === lang);
  }
  
  render() {
    const array = this.props.data.allAirtable.edges;
    const obj = this.extractObject(array, this.props.locale);
    const content = obj[0].node.data;

    return (
      <div>

        <div className="navbar">
          {/* <div className="container"> */}
            <div className="navbar-flex-container">

              <div className="navbar-side" id="navbar-left">
                <div className="navbar-element">
                  <Link to="/shops">{content.venues}</Link>
                </div>

                <div className="navbar-element">
                  <Link to="/pricing">{content.pricing}</Link>
                </div>

                <div className="navbar-element with-dropdown">
                  <span>{content.booking}</span>

                  <div className="navbar-dropdown" id="booking">
                    <Link to="/shops">
                      <div className="navbar-dropdown-item">
                        <h3>{content.book}</h3>
                        <p className="text-small">{content.book_text}</p>
                      </div>
                    </Link>

                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <div className="navbar-dropdown-item">
                        <h3>{content.privatize}</h3>
                        <p className="text-small">{content.privatize_text}</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="navbar-element">
                  <Link to="/concept">{content.concept}</Link>
                </div>
              </div>

              <div className="navbar-logo">
                <Link to="/">
                  <Logo />
                </Link>
              </div>

              <div className="navbar-side" id="navbar-right">

                <div className="navbar-side-container">
                  <span className="navbar-element">
                    <a href="https://blog.hubsy.fr/" target="_blank" rel="noopener noreferrer">{content.blog}</a>
                  </span>

                  <span className="navbar-element">
                    <a href="https://shop.hubsy.fr/" target="_blank" rel="noopener noreferrer">{content.coffee}</a>
                  </span>

                  <span className="navbar-element">
                    <Link to="/barista-training">{content.barista}</Link>
                  </span>
                </div>

                <div className="navbar-language with-dropdown">
                  {this.renderFlag(this.props.locale)}

                  <div className="navbar-dropdown" id="lang-selection">
                    <div className="navbar-dropdown-item navbar-dropdown-item-flex" data-id="fr" onClick={this.handleClick}>
                      {/* <img src={flagFR} alt="fr" /> */}
                      <p>Français</p>
                    </div>

                    <div className="navbar-dropdown-item navbar-dropdown-item-flex" data-id="en" onClick={this.handleClick}>
                      {/* <img src={flagEN} alt="en" /> */}
                      <p>English</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          {/* </div> */}
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
              }
            }
          }
        }
      }  
    `
    }

    render={(data) => {      
      return (
        <Navbar data={data} locale={props.locale} />
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

// function extractObject(array, lang = 'fr') {
//   // Components are called internally during the build sequence,
//   // making locale = undefined which returns an empty object and fail the build.
//   // The default params 'fr' prevents that!
//   // console.log(array, lang);
//   return array.filter(obj => obj.node.data.language === lang);
// }