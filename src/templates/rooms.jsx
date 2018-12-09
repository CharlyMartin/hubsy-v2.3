import React from 'react';
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout';
import PageHeader from '../components/page_header';
import Disclaimer from '../components/disclaimer';
import ButtonA from '../components/button_a';
import Card from '../components/card';

import '../css/pages/room.css'

class RoomsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  prefixLocale(path) {
    return `${this.props.pageContext.prefix}${path}`;
  }

  filterRooms(array, lang = 'fr') {
    console.log(array)
    // return array.filter(obj => obj.node.data.language === lang);
  }

  filterShops(array, lang = 'fr') {
    // Components are called internally during the build sequence,
    // it doesn't pass a locale arg, which makes it undefined.
    // Hence the function returns an empty object and fails the build process.
    // The default params 'fr' prevents that!
    return array.filter(obj => obj.node.data.language === lang);
  }

  renderCards(array, locale) {
    return (
      <div className="rooms">
        {array.map(obj => {
          const rooms = obj.node.data.linked_rooms;
          return (
            <div className="room-item mg-xxl-bottom pd-xxl-bottom" key={obj.node.data.name}>
              <div className="room-shop">
                <a href={this.prefixLocale(`shops/${obj.node.data.slug}`)}>
                  <p>
                    {`Husby ${obj.node.data.name}`} 
                    <span className="text-small"> - {obj.node.data.street} {obj.node.data.postcode}
                    </span>
                  </p>
                </a>
                
                {rooms.map(obj => {
                  console.log(obj.data)
                })}
              </div>
            </div>
          )}
        )}
      </div>  
    )
  }
  
  render() {
    const pageContext = this.props.pageContext;
    const edges = this.props.data.allAirtable.edges;
    const shopsData = this.filterShops(edges, pageContext.locale);

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
        <div path="rooms" title={{"fr": "Salles de Réunions", "en": "Meeting Rooms"}}>
          <div className="container mg-xxl-top-bottom">
            <PageHeader title={pageContext.data.title} subtitle={pageContext.data.subtitle} />

            <div className="page-section">
              {this.renderCards(shopsData, pageContext.locale)}
            </div>

            <Disclaimer text={pageContext.data.privatise}>
              <ButtonA text={pageContext.data.button} path="#" class="button-beige-transparent" />
            </Disclaimer>
          </div>
        </div>
      </Layout>
    )
  }
}
  
export default RoomsPage;

// Two sources of data for this component:
// - props.pageContext => coming from the createPage() action in gatsby-node
// - props.data => coming from the page Query below




export const query = graphql`
{
  allAirtable(filter: {table: {eq: "shops"}}) {
    edges {
      node {
        data {
          name
          language
          street
          postcode
          city
          status
          live
          slug
          linked_rooms {
            data {
              name
              language
              capacity
              capacity
              pictures {
                url
              }
              supersaas
            }
          }
        }
      }
    }
  }
}
`
