import React from 'react';
// import { Link, graphql } from 'gatsby'

import Layout from '../components/layout';
import Item from '../components/item';
import ButtonLink from '../components/button_link';

import '../css/pages/pricing.css'

class PricingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  prefixLocale(path) {
    return `${this.props.pageContext.prefix}${path}`;
  }
  
  render() {
    const pageContext = this.props.pageContext;
    console.log(pageContext)

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
        <div className="container mg-xxl-top-bottom">
          <div className="page-header pd-xxl-bottom">
            <h1>{pageContext.data.title}</h1>
            <h3>{pageContext.data.subtitle}</h3>
          </div>

          <div className="page-section mg-xxl-top">
            <div className="column-layout">
              {/* First column */}
              <div className="column-half pd-lg-right">
                
                <div className="price-table" id="member">
                  <div className="price-table-header pd-md pd-lg-sides">
                    <h2 className="mg-md-top">{pageContext.data.member_title}</h2>
                    <p>{pageContext.data.member_subtitle}</p>
                  </div>

                  <div className="price-table-items pd-lg">
                    <Item text={pageContext.data.member_first} />
                    <Item text={pageContext.data.member_extra} />
                    <Item text={pageContext.data.member_cap} />
                    <Item text={pageContext.data.member_services} />
                    <Item text={pageContext.data.member_checkout} />
                    <div id="offer">
                      <Item text={pageContext.data.member_offer} />
                    </div> 
                  </div>

                </div>

              </div>
              {/* Second column */}
              <div className="column-half pd-lg-left">

                <div className="price-table" id="resident">
                  <div className="price-table-header pd-md pd-lg-sides">
                    <h2 className="mg-md-top">{pageContext.data.res_title}</h2>
                    <p>{pageContext.data.res_subtitle}</p>
                  </div>

                  <div className="price-table-items pd-lg">
                    <Item text={pageContext.data.res_prices} />
                    <Item text={pageContext.data.res_access} />
                    <Item text={pageContext.data.res_validity} />
                    <Item text={pageContext.data.res_services} />
                    <Item text={pageContext.data.res_checkout} />
                  </div>
                </div>

              </div>
            </div>
          </div>

          <br/>
          <br/>
          <br/>

          <div className="page-section mg-xxl-top">
            <div className="room-disclaimer pd-md">
              <p>{pageContext.data.rooms}</p>
              <ButtonLink content={pageContext.data.button_1} path="rooms" class="button-beige"/>
            </div>
          </div>

          <br/>
          <br/>
          <br/>

        </div>
      </Layout>
    )
  }
}
  
export default PricingPage;

// Two sources of data for this component:
// - props.pageContext => coming from the createPage() action in gatsby-node
// - props.data => coming from the page Query below




// export const query = graphql`
//   {
//     allAirtable(filter: {table: {eq: "navbar"}}) {
//       edges {
//         node {
//           data {
//             brand
//             caption
//             button
//             referrals
//             pictures {
//               url
//             }
//             concept
//             language
//           }
//         }
//       }
//     }
//   }
// `
