import React from 'react';
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout';
import Item from '../components/item';
import Button from '../components/button';
import PageHeader from '../components/page_header';
// import Disclaimer from '../components/disclaimer'

import pages from '../data/internal-links';

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
        <div id="pricing-page" path={pageContext.pathname} name={pages.pricing.title[pageContext.locale]}>
          <div className="container mg-xxl-top-bottom">
            <PageHeader title={pageContext.data.title} subtitle={pageContext.data.subtitle_1} />

            <div className="page-section">
              <div className="column-layout">

                <div className="prices">
                  <div className="prices-container">
                    <h2>{pageContext.data.hour_first}</h2>
                    <h2>{pageContext.data.hour_extra}</h2>
                    <div className="prices-cap">
                      <h2>{pageContext.data.hour_cap}</h2>
                      <p>{pageContext.data.hour_students}</p>
                    </div>
                  </div>
                </div>

                <div className="benefits">
                  <div className="benefits-container">
                    <h2>{pageContext.data.benefit_main}</h2>
                    <p>{pageContext.data.benefit_2}</p>
                    <p>{pageContext.data.benefit_3}</p>
                  </div>
                </div>
              </div>

              <br/>
              <br/>

              <div className="text-center">
                <a href="#memberships">
                  <Button class="button-beige-transparent" text={pageContext.data.button_1} />
                </a>
              </div>

              <br/>
              <br/>

              <div className="page-section text-center" id="memberships">
                <h3>{pageContext.data.subtitle_2}</h3>
              </div>

            </div>
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
