import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import Button from '../components/button';
import Item from '../components/item';
import Map from '../components/map';
import HeroImage from '../components/hero_image';

import coffee from '../images/icons/coffee.png';
import screen from '../images/icons/screen.png';
import apple from '../images/icons/apple.png';
import drinks from '../images/icons/drinks.png';
import meeting from '../images/icons/meeting.png';
import phone from '../images/icons/phone.png';
import printer from '../images/icons/printer.png';
import wifi from '../images/icons/wifi.png';

import '../css/pages/shop.css';
import '../css/components/badge.css';
import '../css/components/hero_image.css';

import pages from '../data/internal-links';

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: this.props.pageContext.data.pictures,
      selectedImage: this.props.pageContext.data.pictures[0],
    }
  }

  setBadgeColor() {
    const live = this.props.pageContext.data.live;
    if (live === "true") return "badge-green";
    if (live === "false") return "badge-red";
    return "";
  }

  formatMarker(obj) {
    return [
      {
        lng: obj.data.lng,
        lat: obj.data.lat,
        name: obj.data.name,
        street: obj.data.street,
        postcode: obj.data.postcode,
        slug: obj.data.slug
      }
    ]
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
    const markers = this.formatMarker(pageContext);
    const fullAddress = `${pageContext.data.street}, ${pageContext.data.postcode} ${pageContext.data.city}`

    // const backgroundImage = {
    //   backgroundImage: `url(${this.state.selectedImage.url})`,
    // };
    

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
        <div id="shop-page" path={pageContext.pathname} name={pageContext.data.name}>
          
          <HeroImage class="shop-hero image-bottom" images={pageContext.data.pictures}>
            <div className="container">
              <div className="shop-hero-title">
                <h1>Hubsy {pageContext.data.name}</h1>
                <p className={`badge badge-big ${this.setBadgeColor()}`}>{pageContext.data.status_long}</p>
              </div>
            </div>
          </HeroImage>

          <br/>

          <div className="container mg-xxl-top-bottom">
            <div className="column-layout">
              {/* First Column */}
              <div className="column-half column-one">
                
                <div id="description">
                  <h2>{content.description}</h2>
                  <p>{pageContext.data.description}</p>
                </div>

                <div className="mg-xxl-top" id="hours">
                  <h2>{content.hours}</h2>
                  <p>{`${content.hours_weekdays} : ${pageContext.data.hours_weekdays}`}</p>
                  <p>{`${content.hours_friday} : ${pageContext.data.hours_friday}`}</p>
                  <p>{`${content.hours_weekend} : ${pageContext.data.hours_weekend}`}</p>
                </div>
                
                <div className="mg-xxl-top" id="direction">
                  <h2>{content.direction}</h2>
                  <p>{fullAddress}</p>
                  <p>{`${content.metro} ${pageContext.data.metro}`}</p>
                  <p>{`${content.bus} ${pageContext.data.bus}`}</p>
                  <br/>
                  <div className="shop-map-container">
                    <Map data={markers} zoom={14}/>
                  </div>
                </div>

              </div>
              
              {/* Second Column */}
              <div className="column-half column-two">
                <div className="">
                  <h2>{content.amenities}</h2>
                  <Item image={wifi}    text={pageContext.data.internet} />
                  <Item image={coffee}  text={pageContext.data.coffee} />
                  <Item image={screen}  text={pageContext.data.screen} />
                  <Item image={apple}   text={pageContext.data.food} />
                  <Item image={drinks}  text={pageContext.data.drinks} />
                  
                  <div className="button-item-container">
                    <Item image={meeting} text={pageContext.data.meeting_rooms} />
                    <Link to={this.prefixLocale(`${pages.rooms.path}#${pageContext.data.slug}`)}>
                      <Button text={content.button_1} class="button-beige"/>
                    </Link>
                  </div>

                  <Item image={phone}   text={pageContext.data.booths} />
                  <Item image={printer} text={pageContext.data.printer} />
                </div>
                {/* <div className="mg-xxl-top">
                  <h2>{content.nearby}</h2>
                </div> */}

                <div className="mg-xxl-top" id="prices">
                  <h2>{content.prices}</h2>
                  <p>{pageContext.data.prices}</p>
                  <br />
                  <Link to={this.prefixLocale(pages.pricing.path)}>
                    <Button class="button-green-transparent" text={content.button_2} />
                  </Link>
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
            bus
            metro
            hours
            hours_weekdays
            hours_friday
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
