import React from 'react';
// import { Link, graphql } from 'gatsby'

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

  renderCards(array, locale) {
    return (
      <div className="rooms">
        {array.map(obj => {
          return (
            <div className="room-item mg-xxl-bottom" key={obj.node.data.record_id}>
              <div className="room-shop">
                <h2>{`Husby ${obj.node.data.name}`}</h2>
                <p>{obj.node.data.street}</p>
              </div>
              <p>👉 Room List</p>
              {console.log(obj.node.data.linked_rooms)}
            </div>
            // <Card
            //   key={obj.node.data.record_id}
            //   name={obj.node.data.name}
            //   address={obj.node.data.street}
            //   slug={obj.node.data.slug}
            //   status={obj.node.data.status}
            //   locale={locale}
            //   picture={obj.node.data.pictures[0].url}
            //   live={obj.node.data.live}
            // />
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
    const shopsData = this.filterObjects(edges, pageContext.locale);
    console.log(shopsData);

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
        <div className="container mg-xxl-top-bottom">
          <PageHeader title={pageContext.data.title} subtitle={pageContext.data.subtitle} />

          <div className="page-section">
            {this.renderCards(shopsData, pageContext.locale)}
          </div>

          <Disclaimer text={pageContext.data.privatise}>
            <ButtonA text={pageContext.data.button} path="#" class="button-beige" />
          </Disclaimer>
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
          description
          language
          street
          postcode
          city
          status
          live
          pictures {
            url
          }
          slug
          linked_rooms
          record_id
        }
      }
    }
  }
}
`
