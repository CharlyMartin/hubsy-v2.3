import React from 'react';
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout';
import Item from '../components/item';
import Button from '../components/button';
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
        <div path="pricing" title={{"fr": "Tarifs", "en": "Pricing"}} id="pricing-page">
          <div className="container mg-xxl-top-bottom">
            <PageHeader title={pageContext.data.title} subtitle={pageContext.data.subtitle} />

            <div className="page-section">
              <div className="column-layout prices">

                <div className="column-half">
                  <div className="prices-container">
                    <div>
                      <h2>{pageContext.data.hour_first}</h2>
                      <h2>{pageContext.data.hour_extra}</h2>
                      <div className="prices-cap">
                        <h2>{pageContext.data.hour_cap}</h2>
                        <p>({pageContext.data.hour_students})</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column-half">
                  <div className="benefits-container">
                    <h2>{pageContext.data.benefit_main}</h2>
                    <p>{pageContext.data.benefit_2}</p>
                    <p>{pageContext.data.benefit_3}</p>
                  </div>
                </div>
              </div>

              <br/>

              <div className="text-center">
                <a href="#memberships">
                  <Button class="button-beige-transparent" text="Members" />
                </a>
              </div>



              {/* <div className="column-layout">
                First column
                <div className="column-half column-one">
                  
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
                Second column
                <div className="column-half column-two">

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
              </div> */}
            </div>

            <div className="page-section">
              {/* <Disclaimer text={pageContext.data.rooms}>
                <Link to={this.prefixLocale("rooms")}>
                  <Button text={pageContext.data.button_1} class="button-green-transparent" />
                </Link>
              </Disclaimer> */}
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
