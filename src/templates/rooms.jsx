import React from 'react';
// import { Link, graphql } from 'gatsby'

import Layout from '../components/layout';
import PageHeader from '../components/page_header';
import Disclaimer from '../components/disclaimer';
import ButtonLink from '../components/button_link';

// import '../css/pages/home.css'

class RoomsPage extends React.Component {
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

          <Disclaimer text={pageContext.data.privatise}>
            <ButtonLink content={pageContext.data.button} path={this.prefixLocale('rooms')} class="button-beige" />
          </Disclaimer>
        </div>
      </Layout>
    )
  }
}
  
export default RoomsPage;

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
