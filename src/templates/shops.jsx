import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Card from '../components/card';

import '../css/pages/shops.css';

class ShopsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  prefixLocale(path) {
    return `${this.props.pageContext.locale}${path}`;
  }

  renderCards(array, locale) {
    return (
      <div className="cards">
        {array.map(obj => {
          return (
            <Card
              key={obj.node.data.record_id}
              name={obj.node.data.name}
              address={obj.node.data.street}
              slug={obj.node.data.slug}
              status={obj.node.data.status}
              locale={locale}
              picture={obj.node.data.pictures[0].url}
              live={obj.node.data.live}
            />
          )}
        )}
      </div>  
    )
  }

  filterObjects(array, lang = 'fr') {
    // Components are called internally during the build sequence,
    // it doesn't pass a locale arg, which makes it undefined.
    // Hence the function returns an empty object and fails the build process.
    // The default params 'fr' prevents that!
    return array.filter(obj => obj.node.data.language === lang);
  }
  
  render() {
    const pageContext = this.props.pageContext;
    const edges = this.props.data.allAirtable.edges;
    const cardsArray = this.filterObjects(edges, pageContext.locale);

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
        <div className="container mg-xxl-top-bottom">
          <h1>{pageContext.data.title}</h1>
          
          <div className="column-layout">
            <div className="shops-container">
              {this.renderCards(cardsArray, pageContext.prefix)}
            </div>

            <div className="map-container pd-lg-top-left">
              <div id="shops-map" />
            </div>
          </div>

            

        </div>
      </Layout>
    )
  }
}
  
export default ShopsPage;

// Two sources of data for this component:
// - props.pageContext => coming from the createPage() action in gatsby-node
// - props.data => coming from the page Query below

export const query = graphql`
  {
    allAirtable(filter: {table: {eq: "shops"}}) {
      edges {
        node {
          data {
            language
            name
            live
            slug
            status
            street
            pictures {
              url
            }
            record_id
          }
        }
      }
    }
  }
`
