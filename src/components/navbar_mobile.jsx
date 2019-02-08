// Librairies
import React from 'react';
import { StaticQuery, graphql } from "gatsby";
import { Link } from 'gatsby'

// Components
import Image from '../components/image';
import A from '../components/a'

// Utilities
import { toggleMenu } from '../utilities/toggle_menu';

// Images
import flagFR from '../images/lang/fr.png';
import flagEN from '../images/lang/en.png';
import instagram from '../images/icons/instagram.png';

// Data
import links from '../data/external-links';
import pages from '../data/internal-links';

// CSS
import '../css/components/navbar_mobile.css';

// Helpers
import { prefixLocale } from '../helpers/functions';

class NavbarMobile extends React.Component {
  constructor(props) {
    super(props);
  }

  renderFlag() {
    if (this.props.locale === 'fr') return (<Image src={flagEN} /> );
    if (this.props.locale === 'en') return (<Image src={flagFR} /> );
  }

  createLangLink() {
    if (this.props.locale === 'fr') return `/en/${this.props.path}`;
    if (this.props.locale === 'en') return `/${this.props.path}`;
  }

  filterObjects(array, lang = 'fr') {
    return array.filter(obj => obj.node.data.language === lang);
  }

  componentDidMount() {
    toggleMenu();
  }
  
  render() {
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
              <Link to={prefixLocale(this.props.prefix, pages.about)}>
                <div className="mobile-element">
                  {content.concept}
                </div>
              </Link>

              <Link to={prefixLocale(this.props.prefix, pages.pricing)}>
                <div className="mobile-element">
                  {content.pricing}
                </div>
              </Link>

              <Link to={prefixLocale(this.props.prefix, pages.rooms)}>
                <div className="mobile-element">
                  {content.booking}
                </div>
              </Link>

              <Link to={prefixLocale(this.props.prefix, pages.shops)}>
                <div className="mobile-element" id="mobile-main">
                  {content.venues}
                </div>
              </Link>

              <Link to={prefixLocale(this.props.prefix, pages.barista)}>
                <div className="mobile-element">
                  {content.barista}
                </div>
              </Link>

              <A href={links.blog}>
                <div className="mobile-element">
                  {content.blog}
                </div>
              </A>

              <A href={links.shopify}>
                <div className="mobile-element">
                  {content.coffee}
                </div>
              </A>
            </div>

            <div className="mobile-links">
              {/* LANG FLAG */}
              <Link to={this.createLangLink()}>
                <div className="square">
                  {this.renderFlag()}
                </div>
              </Link>

              {/* INSTAGRAM */}
              <A href={links.ig_mobile}>
                <div className="square">
                  <Image src={instagram}/>
                </div>
              </A>
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