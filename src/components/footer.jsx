import React from 'react';
import { StaticQuery, graphql } from "gatsby";
import { Link } from 'gatsby'

import links from '../data/external-links';
import pages from '../data/internal-links';

import '../css/components/footer.css'

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  prefixLocale(path) {
    return `${this.props.prefix}${path}`;
  }

  renderShopLinks(array) {
    return array.map(obj => {      
      return (
        <Link to={this.prefixLocale(`shops/${obj.data.slug}`)} className="footer-element" key={obj.data.slug}>
          {`Hubsy ${obj.data.name}`}
        </Link>
      )
    })
  }

  filterObjects(array, lang = 'fr') {
    return array.filter(obj => obj.node.data.language === lang);
  }
  
  render() {
    const edges = this.props.data.allAirtable.edges;
    const array = this.filterObjects(edges, this.props.locale);
    const content = array[0].node.data;

    return (
      <div className="footer-component">
        <div className="footer mg-xxl-top">
          <div className="container pd-xxl-top pd-xxl-bottom">
            <div className="column-layout">
              
              <div className="column-quarter footer-column">
                <h3>{content.coworking_title}</h3>
                <Link to={this.prefixLocale(pages.about.path)} className="footer-element">{content.concept}</Link>
                <Link to={this.prefixLocale(pages.pricing.path)} className="footer-element">{content.pricing}</Link>
                <a className="footer-element" href={links.blog} target="_blank" rel="noopener noreferrer">{content.blog}</a>
              </div>

              
              <div className="column-quarter footer-column">
                <h3>{content.location_title}</h3>
                {this.renderShopLinks(content.linked_rooms)}
              </div>

              
              <div className="column-quarter footer-column">
                <h3>{content.services_title}</h3>
                <Link to={this.prefixLocale(pages.rooms.path)} className="footer-element">{content.book}</Link>
                <a className="footer-element" href={links.privatise_form} target="_blank" rel="noopener noreferrer">{content.privatise}</a>
                <a className="footer-element" href={links.shopify} target="_blank" rel="noopener noreferrer">{content.coffee}</a>
                <Link to={this.prefixLocale(pages.barista.path)} className="footer-element">{content.barista}</Link>
                <a className="footer-element" href={links.jobs_form} target="_blank" rel="noopener noreferrer">{content.jobs}</a>
                {/* <a className="footer-element footer-button" href="" target="_blank" rel="noopener noreferrer">{content.jobs}</a> */}
              </div>

              
              <div className="column-quarter footer-column">
                <h3>{content.contact_title}</h3>
                <a className="footer-element" rel="noopener noreferrer" href={`mailto:${content.email}`}>{content.email}</a>
                <a className="footer-element" rel="noopener noreferrer" href={`tel:${content.phone}`}>{content.phone}</a>
                <a className="footer-element" rel="noopener noreferrer" href={links.fb_desktop} target="_blank">Facebook</a>
                <a className="footer-element" rel="noopener noreferrer" href={links.ig_desktop} target="_blank">Instagram</a>
              </div>

            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-container">
              <h4>Hubsy 2015 - {new Date().getFullYear()}</h4>
              <Link to={pages.ml.path} className="footer-bottom-element">Mentions Légales</Link>
              <Link to={pages.cgv.path} className="footer-bottom-element">Conditions Générales de Vente</Link>
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
                privatise
                jobs

                phone
                email

                linked_rooms {
                  data {
                    name
                    slug
                  }
                }
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