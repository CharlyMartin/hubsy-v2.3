import React from 'react';
// import { Link, graphql } from 'gatsby'

import Layout from '../components/layout';
import Membership from '../components/membership';
import Button from '../components/button';
import PageHeader from '../components/page_header';
import NumberItem from '../components/number_item'

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
                    <h3>{pageContext.data.hour_extra}</h3>
                    <div className="prices-cap">
                      <h3>{pageContext.data.hour_cap}</h3>
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

              <div className="page-section" id="memberships">
                <h3 className="text-center">{pageContext.data.subtitle_2}</h3>

                <div className="grid">
                  <Membership>
                    <div className="membership-step">
                      <NumberItem number="1" class="transparent" />
                      <p>Je me rends chez Hubsy</p>
                    </div>
                    
                    <div className="membership-step">
                      <NumberItem number="2" class="transparent" />
                      <p>Je souscris à l’offre lors de mon passage au comptoir</p>
                    </div>

                    <div className="membership-step">
                      <NumberItem number="3" class="transparent" />
                      <p>Je recois ma carte de membre gratuitement</p>
                    </div>

                    <div className="membership-step">
                      <NumberItem number="4" class="plain" />
                      <p>Je profite des avantages Hubsy</p>
                    </div>
                  </Membership>

                  <Membership>
                    <div className="membership-step">
                      <NumberItem number="1" class="transparent" />
                      <p>Je me rends chez Hubsy</p>
                    </div>
                    
                    <div className="membership-step">
                      <NumberItem number="2" class="transparent" />
                      <p>Je souscris à l’offre lors de mon passage au comptoir</p>
                    </div>

                    <div className="membership-step">
                      <NumberItem number="3" class="transparent" />
                      <p>Je recois ma carte de membre gratuitement</p>
                    </div>

                    <div className="membership-step">
                      <NumberItem number="4" class="plain" />
                      <p>Je profite des avantages Hubsy</p>
                    </div>
                  </Membership>

                  <Membership>
                    <div className="membership-step">
                      <NumberItem number="1" class="transparent" />
                      <p>Je me rends chez Hubsy</p>
                    </div>
                    
                    <div className="membership-step">
                      <NumberItem number="2" class="transparent" />
                      <p>Je souscris à l’offre lors de mon passage au comptoir</p>
                    </div>

                    <div className="membership-step">
                      <NumberItem number="3" class="transparent" />
                      <p>Je recois ma carte de membre gratuitement</p>
                    </div>

                    <div className="membership-step">
                      <NumberItem number="4" class="plain" />
                      <p>Je profite des avantages Hubsy</p>
                    </div>
                  </Membership>
                </div> 
              </div>

            </div>
          </div>

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
