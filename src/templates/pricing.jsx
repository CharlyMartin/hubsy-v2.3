import React from 'react';
// import { Link, graphql } from 'gatsby'

import Layout from '../components/layout';
import Item from '../components/item';
import ButtonLink from '../components/button_link';
import PageHeader from '../components/page_header';
import Disclaimer from '../components/disclaimer'

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

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
        <div path="pricing" title={{"fr": "Tarifs", "en": "Pricing"}}>
          <div className="container mg-xxl-top-bottom">
            <PageHeader title={pageContext.data.title} subtitle={pageContext.data.subtitle} />

            <div className="page-section mg-xxl-top">
              <div className="column-layout">
                {/* First column */}
                <div className="column-half pd-xl-right">
                  
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
                <div className="column-half pd-xl-left">

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
              <Disclaimer text={pageContext.data.rooms}>
                <ButtonLink text={pageContext.data.button_1} path={this.prefixLocale('rooms')} class="button-beige-transparent" />
              </Disclaimer>
            </div>

            <br/>
            <br/>
          </div>
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
