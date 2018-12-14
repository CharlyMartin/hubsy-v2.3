import React from 'react';
import { Link } from 'gatsby'
import Button from '../components/button';
import Layout from '../components/layout';
import PageHeader from '../components/page_header';

import '../css/pages/about.css';

import links from '../data/links';

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

            <div className="page-section">
              
              {/* Item 1 */}
              <div className="column-layout pd-xxl-bottom mg-xxl-bottom">
                <div className="text-column">
                  <h2>{pageContext.data.item_1_title}</h2>
                  <p>{pageContext.data.item_1_text}</p>
                  <br/>
                  <br/>
                  <Link to={this.prefixLocale("shops")}>
                    <Button text={pageContext.data.item_1_button} class="button-beige" />
                  </Link>
                </div>

                <div className="picture-column">
                  <div  className="concept-image image-centered"
                        style={{backgroundImage: `url(${pageContext.data.item_1_picture[0].url})`}}
                        data-animation="fade-in" />
                </div>
              </div>

              {/* Item 2 */}
              <div className="column-layout pd-xxl-bottom mg-xxl-bottom image-left">
                <div className="text-column">
                  <h2>{pageContext.data.item_2_title}</h2>
                  <p>{pageContext.data.item_2_text}</p>
                  <br/>
                  <br/>
                  <a href={links.blog} target="_blank" rel="noopener noreferrer">
                    <Button text={pageContext.data.item_2_button} class="button-green-transparent" />
                  </a>
                </div>

                <div className="picture-column">
                  <div  className="concept-image image-centered"
                        style={{backgroundImage: `url(${pageContext.data.item_2_picture[0].url})`}}
                        data-animation="fade-in" />
                </div>
              </div>

              {/* Item 3 */}
              <div className="column-layout pd-xxl-bottom mg-xxl-bottom">
                <div className="text-column">
                  <h2>{pageContext.data.item_3_title}</h2>
                  <p>{pageContext.data.item_3_text}</p>
                  <br/>
                  <br/>
                  <Link to={this.prefixLocale("pricing")}>
                    <Button text={pageContext.data.item_3_button} class="button-green-transparent" />
                  </Link>
                </div>

                <div className="picture-column">
                  <div  className="concept-image image-centered"
                        style={{backgroundImage: `url(${pageContext.data.item_3_picture[0].url})`}}
                        data-animation="fade-in" />
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
