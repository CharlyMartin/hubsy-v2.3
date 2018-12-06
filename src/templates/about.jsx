import React from 'react';
// import { Link, graphql } from 'gatsby'
import ButtonLink from '../components/button_link';
import ButtonA from '../components/button_a';
import Layout from '../components/layout';
import PageHeader from '../components/page_header';
// import TextImage from '../components/text_image';

import '../css/pages/about.css'

class aboutPage extends React.Component {
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
        <div path="about" title={{"fr": "Concept", "en": "About"}}>
          <div className="container mg-xxl-top-bottom">
            <PageHeader title={pageContext.data.title} subtitle={pageContext.data.subtitle} />

            <div className="page-section mg-xxl-top">
              
              {/* Item 1 */}
              <div className="column-layout pd-xxl-bottom mg-xxl-bottom">
                <div className="text-column">
                  <h2>{pageContext.data.item_1_title}</h2>
                  <p>{pageContext.data.item_1_text}</p>
                  <br/>
                  <br/>
                  <ButtonLink text={pageContext.data.item_1_button} path={this.prefixLocale("shops")} class="button-beige" />
                </div>

                <div className="picture-column">
                  <div className="concept-image image-centered"
                      style={{backgroundImage: `url(${pageContext.data.item_1_picture[0].url})`}} />
                </div>
              </div>

              {/* Item 2 */}
              <div className="column-layout pd-xxl-bottom mg-xxl-bottom image-left">
                <div className="text-column">
                  <h2>{pageContext.data.item_2_title}</h2>
                  <p>{pageContext.data.item_2_text}</p>
                  <br/>
                  <br/>
                  <ButtonA text={pageContext.data.item_2_button} path="https://shop.hubsy.fr/" class="button-green-transparent" />
                </div>

                <div className="picture-column">
                  <div className="concept-image image-centered"
                      style={{backgroundImage: `url(${pageContext.data.item_2_picture[0].url})`}} />
                </div>
              </div>

              {/* Item 3 */}
              <div className="column-layout pd-xxl-bottom mg-xxl-bottom">
                <div className="text-column">
                  <h2>{pageContext.data.item_3_title}</h2>
                  <p>{pageContext.data.item_3_text}</p>
                  <br/>
                  <br/>
                  <ButtonLink text={pageContext.data.item_3_button} path={this.prefixLocale("pricing")} class="button-green-transparent" />
                </div>

                <div className="picture-column">
                  <div className="concept-image image-centered"
                      style={{backgroundImage: `url(${pageContext.data.item_3_picture[0].url})`}} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
  
export default aboutPage;

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
