import React from 'react';
import { graphql } from 'gatsby'
import Layout from '../components/layout';
// import PageHeader from '../components/page_header';

const CGVPage = (props) => {
  return (
    <Layout prefix={props.pageContext.prefix} locale={props.pageContext.locale}>
      <div className="container-sm">
        <h1>Hello</h1>
      </div>
    </Layout>
  );
};
  
export default CGVPage;

// Two sources of data for this component:
// - props.pageContext => coming from the createPage() action in gatsby-node
// - props.data => coming from the page Query below

export const query = graphql`
  {
    allAirtable(filter: {table: {eq: "cgv_page"}}) {
      edges {
        node {
          data {
            title
          }
        }
      }
    }
  }
`
