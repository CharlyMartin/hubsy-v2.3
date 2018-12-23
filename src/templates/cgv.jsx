import React from 'react';
import { graphql } from 'gatsby'
import Layout from '../components/layout';

import '../css/pages/legal.css'

const CGVPage = (props) => {
  return (
    <Layout prefix={props.pageContext.prefix} locale={props.pageContext.locale}>
      <div  className="container-sm mg-xxl-top-bottom pd-xl-top-bottom"
            id="cgv-page"
            path={this.props.location.pathname}
            dangerouslySetInnerHTML={{__html: props.data.airtable.data.content_md.childMarkdownRemark.html}} />
    </Layout>
  );
};
  
export default CGVPage;

// Two sources of data for this component:
// - props.pageContext => coming from the createPage() action in gatsby-node
// - props.data => coming from the page Query below

export const query = graphql`
  {
    airtable(table: {eq: "cgv_page"}) {
      data {
        content_md {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
