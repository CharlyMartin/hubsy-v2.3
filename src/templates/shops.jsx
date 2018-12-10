import React from 'react';
import { graphql, Link } from 'gatsby';
// import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

import Layout from '../components/layout';
import Card from '../components/card';
import Map from '../components/map';

import '../css/pages/shops.css';

class ShopsPage extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   shops: this.filterObjects(this.props.data.allAirtable.edges, this.props.pageContext.locale),
    //   selectedShop: ''
    // }
  }

  formatMarkers(array) {
    return array.map((obj) => {
      return {
        lng: obj.node.data.lng,
        lat: obj.node.data.lat,
        name: obj.node.data.name,
        street: obj.node.data.street,
        postcode: obj.node.data.postcode,
        slug: obj.node.data.slug
      }
    })
  }

  prefixLocale(path) {
    return `${this.props.pageContext.locale}${path}`;
  }

  filterObjects(array, lang = 'fr') {
    // Components are called internally during the build sequence,
    // it doesn't pass a locale arg, which makes it undefined.
    // Hence the function returns an empty object and fails the build process.
    // The default params 'fr' prevents that!
    return array.filter(obj => obj.node.data.language === lang);
  }

  renderCards(array, locale) {
    return (
      <div className="shops-container">
        {array.map(obj => {
          const address = `${obj.node.data.street}, ${obj.node.data.postcode}`
          return (
            <Link to={`${locale}shops/${obj.node.data.slug}`} key={obj.node.data.record_id}>
              <Card
                title={obj.node.data.name}
                subtitle={address}
                status={obj.node.data.status}
                picture={obj.node.data.pictures[0].url}
                live={obj.node.data.live}
              />
            </Link>
          )}
        )}
      </div>  
    )
  }
  
  render() {
    const pageContext = this.props.pageContext;
    const edges = this.props.data.allAirtable.edges;
    const shopsData = this.filterObjects(edges, pageContext.locale);
    const markersData = this.formatMarkers(shopsData);

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
        <div path="shops" title={{"fr": "Nos Espaces a Paris", "en": "Our Venues in Paris"}}>
        
          <div className="container mg-xxl-top-bottom">
            <h1>{pageContext.data.title}</h1>
            
            <div className="column-layout">
              {this.renderCards(shopsData, pageContext.prefix)}

              <div className="map-container">
                <div className="shops-map-container">
                  <Map data={markersData} zoom={12}/>
                </div>
              </div>
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
            postcode
            pictures {
              url
            }
            record_id
            lat
            lng
          }
        }
      }
    }
  }
`
