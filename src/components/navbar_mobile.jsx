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
          <div className="navbar-mobile-content-border"></div>
          <div className="navbar-mobile-content-background">

          </div>
          <div className="corner top-right" id="close-button">
            <Image src={close}/>
          </div>

          <Link to={this.createLangLink()}>
            <div className="corner bottom-right">
              {this.renderFlag()}
            </div>
          </Link>

          <a rel="noopener noreferrer" href='https://www.instagram.com/hubsycafe/' target="_blank">
            <div className="corner bottom-left">
              <Image src={instagram}/>
            </div>
          </a>
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