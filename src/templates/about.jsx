import React from 'react';
// import { Link, graphql } from 'gatsby'

import Layout from '../components/layout';
import PageHeader from '../components/page_header';
import TextImage from '../components/text_image';

// import '../css/pages/home.css'

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
        <div className="container mg-xxl-top-bottom">
          <PageHeader title={pageContext.data.title} subtitle={pageContext.data.subtitle} />

          <div className="page-section mg-xxl-top">
            <TextImage title={pageContext.data.item_1_title}
                      text={pageContext.data.item_1_text}
                      image={pageContext.data.item_1_picture[0].url}
                      image_side="right"
                      btn={{
                        content: pageContext.data.item_1_button,
                        color: "button-beige",
                        path: this.prefixLocale("shops")
                      }}
              />

            <TextImage title={pageContext.data.item_2_title}
                      text={pageContext.data.item_2_text}
                      image={pageContext.data.item_2_picture[0].url}
                      image_side="left"
                      link={{
                        content: pageContext.data.item_2_button,
                        color: "button-green",
                        path: 'https://shop.hubsy.fr/'
                      }}
              />

            <TextImage title={pageContext.data.item_3_title}
                      text={pageContext.data.item_3_text}
                      image={pageContext.data.item_3_picture[0].url}
                      image_side="right"
                      btn={{
                        content: pageContext.data.item_3_button,
                        color: "button-green",
                        path: this.prefixLocale("shops")
                      }}
              />

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
