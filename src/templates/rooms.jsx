// Librairies
import React from 'react';
import { graphql, Link } from 'gatsby'

// Components
import Layout from '../components/layout';
import PageHeader from '../components/page_header';
import Disclaimer from '../components/disclaimer';
import Button from '../components/button';
import Card from '../components/card';
import A from '../components/a';

// CSS
import '../css/pages/room.css'

// Data
import links from '../data/external-links';
import pages from '../data/internal-links';

// Helpers
import { prefixLocale } from '../helpers/functions';

class RoomsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  filterObjects(array, lang = 'fr') {
    // Components are called internally during the build sequence,
    // it doesn't pass a locale arg, which makes it undefined.
    // Hence the function returns an empty object and fails the build process.
    // The default params 'fr' prevents that!
    return array.filter(obj => obj.node.data.language === lang);
  }

  // renderRightComponent(obj) {
  //   if (obj.node.data.live === "false") {
  //     return (
  //       <div className="mg-md-top">
  //         <h2>Opening Soon 😄</h2>
  //       </div>
  //     )
  //   }

  //   return (
  //     <div className="grid">
  //       {this.renderCards(obj.node.data.linked_rooms)}
  //     </div>
  //   );
  // }

  renderCards(array) {
    return array.map(obj => {      
      return (
        <A href={obj.data.supersaas} key={obj.data.record_id}>
          <Card
            title={obj.data.name}
            // subtitle={`${this.props.pageContext.data.capacity} ${obj.data.capacity}`}
            subtitle={obj.data.capacity}
            picture={obj.data.pictures[0].url}
            status=""
          />
        </A>
      )
    })
  }
  
  render() {
    const pageContext = this.props.pageContext;
    const edges = this.props.data.allAirtable.edges;
    const shopsData = this.filterObjects(edges, pageContext.locale);

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale} title={pageContext.data.seo_title} description={pageContext.data.seo_description}>
        <div id="rooms-page" path={pageContext.pathname}>
          <div className="container mg-xxl-top-bottom">
            <PageHeader title={pageContext.data.title} subtitle={pageContext.data.subtitle} />

            <div className="page-section">
                
              {shopsData.map(obj => {
                return (
                  <div className="rooms" key={obj.node.data.name} id={obj.node.data.slug}>
                    <Link to={prefixLocale(this.props.pageContext.prefix, `${pages.shops}/${obj.node.data.slug}`)}>
                      
                      <h3 className="room-shops">{`Hubsy ${obj.node.data.name}`}</h3>
                      <span className="text-small"> - {obj.node.data.street} {obj.node.data.postcode}
                      </span>

                    </Link>
                    
                    <div className="grid">
                      {this.renderCards(obj.node.data.linked_rooms)}
                    </div>
                  </div>
                )}
              )}

            </div>

            {/* <div className="page-section"> */}

            <Disclaimer text={pageContext.data.privatise}>
              <A href={links.privatise_form}>
                <Button text={pageContext.data.button} class="button-green-transparent" />
              </A>
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
