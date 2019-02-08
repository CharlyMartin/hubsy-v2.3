// Librairies
import React from 'react';
import { StaticQuery, graphql } from "gatsby";
import { Link } from 'gatsby'

// Components
import A from './a';

// Data
import links from '../data/external-links';
import pages from '../data/internal-links';

// CSS
import '../css/components/footer.css';

// Helper functions
import { prefixLocale } from '../helpers/functions';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  renderShopLinks(array) {
    return array.map(obj => {      
      return (
        <Link to={prefixLocale(this.props.prefix, `${pages.shops}/${obj.data.slug}`)} className="footer-element" key={obj.data.slug}>
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
                <Link to={prefixLocale(this.props.prefix, pages.about)} className="footer-element">{content.concept}</Link>
                <Link to={prefixLocale(this.props.prefix, pages.pricing)} className="footer-element">{content.pricing}</Link>
                <A class="footer-element" href={links.blog}> {content.blog} </A>
              </div>

              
              <div className="column-quarter footer-column">
                <h3>{content.location_title}</h3>
                {this.renderShopLinks(content.linked_rooms)}
              </div>

              
              <div className="column-quarter footer-column">
                <h3>{content.services_title}</h3>
                <Link to={prefixLocale(this.props.prefix, pages.rooms)} className="footer-element">{content.book}</Link>
                <A class="footer-element" href={links.privatise_form}> {content.privatise} </A>
                <A class="footer-element" href={links.shopify}> {content.coffee} </A>
                <Link to={prefixLocale(this.props.prefix, pages.barista)} className="footer-element"> {content.barista} </Link>
                <A class="footer-element" href={links.jobs_form}> {content.jobs} </A>
                {/* <a className="footer-element footer-button" href="" target="_blank" rel="noopener noreferrer">{content.jobs}</a> */}
              </div>

              
              <div className="column-quarter footer-column">
                <h3>{content.contact_title}</h3>
                <A class="footer-element" href={`mailto:${content.email}`}> {content.email} </A>
                <A class="footer-element" href={`tel:${content.phone}`}> {content.phone} </A>
                <A class="footer-element" href={links.fb_desktop}> Facebook </A>
                <A class="footer-element" href={links.ig_desktop}> Instagram </A>
              </div>

            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-container">
              <h4>Hubsy 2015 - {new Date().getFullYear()}</h4>
              <Link to={pages.ml} className="footer-bottom-element">Mentions Légales</Link>
              <Link to={pages.cgv} className="footer-bottom-element">Conditions Générales de Vente</Link>
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