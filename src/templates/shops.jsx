import React from 'react';
import { graphql } from 'gatsby';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

import Layout from '../components/layout';
import CardLink from '../components/card_link';

import icon from '../images/icons/marker.png';
console.log(icon);

import '../css/pages/shops.css';

class ShopsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  prefixLocale(path) {
    return `${this.props.pageContext.locale}${path}`;
  }

  initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaHVic3kiLCJhIjoiY2pwYXl1NHl3MDYxNDNxcDhkbm5qZm9ueiJ9.rTv8xFX5CHvdxHpz08id8Q';
    
    const map = new mapboxgl.Map({
      container: 'shops-map',
      style: 'mapbox://styles/mapbox/streets-v10',
      zoom: 11,
      center: [2.3522219, 48.856614] // Paris
    });

    map.addControl(new mapboxgl.NavigationControl());

    // const marker = new mapboxgl.Marker()
    //   .setLngLat([2.3522219, 48.856614])
    //   .addTo(map);
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
      <div className="cards">
        {array.map(obj => {
          const address = `${obj.node.data.street}, ${obj.node.data.postcode}`
          return (
            <CardLink
              key={obj.node.data.record_id}
              title={obj.node.data.name}
              subtitle={address}
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

  componentDidMount() {
    this.initMap()
  }
  
  render() {
    const pageContext = this.props.pageContext;
    const edges = this.props.data.allAirtable.edges;
    const shopsData = this.filterObjects(edges, pageContext.locale);

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
        <div path="shops">
          <link href='https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css' rel='stylesheet' />
          {/* Mapbox stylesheet */}

          <div className="container mg-xxl-top-bottom">
            <h1>{pageContext.data.title}</h1>
            
            <div className="column-layout">
              <div className="shops-container">
                {this.renderCards(shopsData, pageContext.prefix)}
              </div>

              <div className="map-container pd-lg-top-left">
                <div id="shops-map" />
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
          }
        }
      }
    }
  }
`
