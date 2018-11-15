import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import ButtonLink from '../components/button_link'

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
    console.log('pageContext', pageContext);
    console.log('content', content);

    const backgroundImage = {
      backgroundImage: `linear-gradient(rgba(25, 25, 25, 0), rgba(25, 25, 25, 0.5)), url(${this.state.selectedImage.url})`,
    };
    const fullAddress = `${pageContext.data.street}, ${pageContext.data.postcode} ${pageContext.data.city}`

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
        <div className="shop-hero image-centered" style={backgroundImage}>
          <div className="container">
            <div className="pd-lg-sides">
              <h1>Hubsy {pageContext.data.name}</h1>
              {/* <h3>{fullAddress}</h3> */}
            </div>
          </div>
        </div>

        <div className="container mg-xxl-top-bottom">
          <div className="column-layout">
            {/* First Column */}
            <div className="shop-left-container pd-lg-right">
              
              <div id="description">
                <h2>{content.description}</h2>
                <p>{pageContext.data.description}</p>
              </div>
              
              <div className="mg-xxl-top" id="direction">
                <h2>{content.direction}</h2>
                <p>{fullAddress}</p>
                <p>{pageContext.data.transport}</p>
                <br/>
                <div id="shop-map" />
              </div>

              <div className="mg-xxl-top" id="hours">
                <h2>{content.hours}</h2>
                <p>{`${content.hours_weekdays} : ${pageContext.data.hours_weekdays}`}</p>
                <p>{`${content.hours_weekend} : ${pageContext.data.hours_weekend}`}</p>
              </div>

              <div className="mg-xxl-top" id="prices">
                <h2>{content.prices}</h2>
                <p>{pageContext.data.prices}</p>
                <br />
                <ButtonLink class="button-green" path={this.prefixLocale("pricing")} content={content.button_2} />
              </div>

              <div className="mg-xxl-top" id="contact">
                <h2>{content.contact}</h2>
                <p>
                  <a href={`mailto:${pageContext.data.email}`}> {pageContext.data.email} </a>
                </p>
                <p>
                <a href={`tel:${pageContext.data.phone}`}> {pageContext.data.phone} </a>
                </p>
              </div>
            </div>
            
            {/* Second Column */}
            <div className="shop-right-container pd-lg-left">
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
            phone
            email
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
