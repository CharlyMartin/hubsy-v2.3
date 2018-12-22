import React from 'react';
// import { Link } from 'gatsby'
// import Button from '../components/button';
// import Layout from '../components/layout';
// import PageHeader from '../components/page_header';

class CGVPage extends React.Component {
  constructor(props) {
    super(props);
  }

  prefixLocale(path) {
    return `${this.props.pageContext.prefix}${path}`;
  }
  
  render() {
    // const pageContext = this.props.pageContext;

    return (
      // <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
      //   Hello
      // </Layout>
      <p>Hello</p>
    )
  }
}
  
export default CGVPage;

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
