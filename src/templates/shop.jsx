import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';

import '../css/pages/shop.css';

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: this.props.pageContext.data.pictures,
      selectedImage: this.props.pageContext.data.pictures[0],
    }
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
  

  render() {
    const pageContext = this.props.pageContext;
    const edges = this.props.data.allAirtable.edges;
    const array = this.filterObjects(edges, pageContext.locale);
    const content = array[0].node.data;

    const backgroundImage = {
      backgroundImage: `linear-gradient(rgba(25, 25, 25, 0), rgba(25, 25, 25, 0.5)), url(${this.state.selectedImage.url})`,
    };
    const fullAddress = `${pageContext.data.address}, ${pageContext.data.postcode} ${pageContext.data.city}`

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
        <div className="shop-hero image-centered" style={backgroundImage}>
          <div className="container">
            <div className="pad-lg-sides">
              <h1>Hubsy {pageContext.data.name}</h1>
              {/* <h3>{fullAddress}</h3> */}
            </div>
          </div>
        </div>

        <div className="container container-margin">
          <div className="column-layout">
            <div className="shop-left-container pad-lg-right">
              
              <div>
                <h2>{content.description}</h2>
                <p>{pageContext.data.description}</p>
              </div>
              
              <div className="mar-xl-top">
                <h2>{content.direction}</h2>
                <p>{fullAddress}</p>
                <p>{pageContext.data.transport}</p>
                <br/>
                <div id="shop-map" />
              </div>

              <div className="mar-xl-top">
                <h2>{content.hours}</h2>
                <p>{`${content.hours_weekdays} : ${pageContext.data.hours_weekdays}`}</p>
                <p>{`${content.hours_weekend} : ${pageContext.data.hours_weekend}`}</p>
              </div>
            </div>

            <div className="shop-right-container pad-lg-left">
              <div className="shop-block">
                <h2>{content.amenities}</h2>
                <p>{pageContext.data.transport}</p>
              </div>
            </div>

          </div>  
        </div>
      </Layout>
    )
  }
}
  
export default ShopPage;

// Two sources of data for this component:
// - props.pageContext => coming from the createPage() action in gatsby-node
// - props.data => coming from the page Query below


export const query = graphql`
  {
    allAirtable(filter: {table: {eq: "shop_page"}}) {
      edges {
        node {
          data {
            language
            description
            direction
            hours
            hours_weekdays
            hours_weekend
            prices
            contact
            amenities
            button_1
            button_2
            nearby
          }
        }
      }
    }
  }
`
