import React from 'react';
import { StaticQuery, graphql } from "gatsby";
import { Link } from 'gatsby'

import '../css/components/footer.css'

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  prefixLocale(path) {
    return `${this.props.prefix}${path}`;
  }

  filterObjects(array, lang = 'fr') {
    return array.filter(obj => obj.node.data.language === lang);
  }
  
  render() {
    const edges = this.props.data.allAirtable.edges;
    const array = this.filterObjects(edges, this.props.locale);
    const content = array[0].node.data;

    return (
      <div>
        <div className="footer mg-xxl-top">
          <div className="container pd-xxl-top pd-xxl-bottom">
            <div className="column-layout">
              
              <div className="column-quarter footer-column">
                <h3>{content.coworking_title}</h3>
                <Link to={this.prefixLocale("about")} className="footer-element">{content.concept}</Link>
                <Link to={this.prefixLocale("pricing")} className="footer-element">{content.pricing}</Link>
                <a className="footer-element" href="https://blog.hubsy.fr/" target="_blank" rel="noopener noreferrer">{content.blog}</a>
              </div>

              
              <div className="column-quarter footer-column">
                <h3>{content.location_title}</h3>
                <Link to={this.prefixLocale("shops")} className="footer-element">Hubsy ...</Link>
                <Link to={this.prefixLocale("shops")} className="footer-element">Hubsy ...</Link>
                <Link to={this.prefixLocale("shops")} className="footer-element">Hubsy ...</Link>
              </div>

              
              <div className="column-quarter footer-column">
                <h3>{content.services_title}</h3>
                <Link to={this.prefixLocale("rooms")} className="footer-element">{content.book}</Link>
                <a className="footer-element" href="https://shop.hubsy.fr/" target="_blank" rel="noopener noreferrer">{content.coffee}</a>
                {/* <Link to={this.prefixLocale("shops")} className="footer-element">Hubsy ...</Link> */}
                <Link to={this.prefixLocale("barista-training")} className="footer-element">{content.barista}</Link>
                {/* <a className="footer-element footer-button" href="#" target="_blank" rel="noopener noreferrer">{content.franchise}</a> */}
              </div>

              
              <div className="column-quarter footer-column">
                <h3>{content.contact_title}</h3>
                <a className="footer-element" rel="noopener noreferrer" href='mailto:contact@hubsy.fr'>{content.email}</a>
                <a className="footer-element" rel="noopener noreferrer" href='tel:00000000'>{content.phone}</a>
                <a className="footer-element" rel="noopener noreferrer" href='https://www.facebook.com/hubsycafe/' target="_blank">{content.facebook}</a>
                <a className="footer-element" rel="noopener noreferrer" href='https://www.instagram.com/hubsycafe/' target="_blank">{content.instagram}</a>
              </div>

            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-container">
              <h4>Hubsy 2015 - {new Date().getFullYear()}</h4>
              <a className="footer-bottom-element" rel="noopener noreferrer" href='#' target="_blank">Mentions Légales</a>
              <a className="footer-bottom-element" rel="noopener noreferrer" href='#' target="_blank">Conditions Générales de Ventes</a>
            </div>
          </div>
        </div>

      </div>
    )
  }
}


export default (props) => {
  return (<StaticQuery
    query={graphql`
      query {
        allAirtable(filter: {table: {eq: "footer"}}) {
          edges {
            node {
              data {
                coworking_title
                location_title
                services_title
                contact_title
                language

                concept
                pricing
                blog

                book
                coffee
                barista
                franchise

                phone
                email
                facebook
                instagram

              }
            }
          }
        }
      }  
    `
    }

    render={(data) => {      
      return (
        <Footer data={data} locale={props.locale} prefix={props.prefix} />
      )}
    }
  />)
}