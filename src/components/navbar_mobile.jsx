import React from 'react';
import { StaticQuery, graphql } from "gatsby";
import { Link } from 'gatsby'

import Image from './image';

// import Logo from './images/logo';
// import FlagFR from './images/flag_fr';
// import FlagEN from './images/flag_en';

import logo from '../images/logo/logo.png';
import flagFR from '../images/lang/fr.png';
import flagEN from '../images/lang/en.png';

import '../css/components/navbar.css';



class NavbarMobile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // navbarDropdown();
  }

  // renderFlag() {
  //   if (this.props.locale === 'fr') return (<Image src={flagFR} /> );
  //   if (this.props.locale === 'en') return (<Image src={flagEN} /> );
  // }

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
        Hello
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
        <NavbarMobile data={data} locale={props.locale} prefix={props.prefix} path={props.path} />
      )}
    }
  />)
}