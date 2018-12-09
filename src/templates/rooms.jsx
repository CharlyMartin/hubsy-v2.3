import React from 'react';
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout';
import PageHeader from '../components/page_header';
import Disclaimer from '../components/disclaimer';
import Button from '../components/button';
import Card from '../components/card';

import '../css/pages/room.css'
// import { div } from 'gl-matrix/src/gl-matrix/vec3';

class RoomsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  prefixLocale(path) {
    return `${this.props.pageContext.prefix}${path}`;
  }

  filterObjects(array, lang = 'fr') {
    // Components are called internally during the build sequence,
    // it doesn't pass a locale arg, which makes it undefined.
    // Hence the function returns an empty object and fails the build process.
    // The default params 'fr' prevents that!
    return array.filter(obj => obj.node.data.language === lang);
  }

  renderRightComponent(obj) {
    if (obj.node.data.live === "false") {
      return (
        <div className="mg-md-top">
          <h2>Opening Soon 😄</h2>
        </div>
      )
    }

    return this.renderCards(obj.node.data.linked_rooms);
  }

  renderCards(array) {
    return array.map(obj => {      
      return (
        <div className="column-third pd-md" key={obj.data.record_id}>
          <a href={obj.data.supersaas} target="_blank" rel="noopener noreferrer">
            <Card
              title={obj.data.name}
              subtitle={obj.data.capacity}
              picture={obj.data.pictures[0].url}
              status=""
            />
          </a>
        </div>
      )
    })
  }

  // renderShops(array, locale) {
  //   return (
  //     <div className="rooms">
  //       {array.map(obj => {
  //         return (
  //           <div className="room-item mg-xxl-bottom pd-xxl-bottom" key={obj.node.data.name} id={obj.node.data.slug}>
  //             <a href={this.prefixLocale(`shops/${obj.node.data.slug}`)}>
  //               <p>{`Husby ${obj.node.data.name}`}</p>
  //               <span className="text-small"> - {obj.node.data.street} {obj.node.data.postcode}
  //               </span>
  //             </a>
                
  //             {this.renderRooms(obj.node.data.linked_rooms)}
  //           </div>
  //         )}
  //       )}
  //     </div>  
  //   )
  // }
  
  render() {
    const pageContext = this.props.pageContext;
    const edges = this.props.data.allAirtable.edges;
    const shopsData = this.filterObjects(edges, pageContext.locale);

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
        <div path="rooms" title={{"fr": "Salles de Réunions", "en": "Meeting Rooms"}}>
          <div className="container mg-xxl-top-bottom">
            <PageHeader title={pageContext.data.title} subtitle={pageContext.data.subtitle} />

            <div className="page-section">
              <div className="rooms">
                
                {shopsData.map(obj => {
                  return (
                    <div className="room-item mg-xxl-bottom pd-xxl-bottom" key={obj.node.data.name} id={obj.node.data.slug}>
                      <a href={this.prefixLocale(`shops/${obj.node.data.slug}`)}>
                        <p>{`Husby ${obj.node.data.name}`}</p>
                        <span className="text-small"> - {obj.node.data.street} {obj.node.data.postcode}
                        </span>
                      </a>

                      <div className="column-layout">
                        {this.renderRightComponent(obj)}
                        {/* {(obj.node.data.live === "true") ? this.renderCards(obj.node.data.linked_rooms) : <h2>Opening Soon 😄</h2>} */}
                      </div>
                    </div>
                  )}
                )}

              </div>
            </div>

            <Disclaimer text={pageContext.data.privatise}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button text={pageContext.data.button} class="button-beige-transparent" />
              </a>
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
              pictures {
                url
              }
              supersaas
              record_id
            }
          }
        }
      }
    }
  }
}
`
