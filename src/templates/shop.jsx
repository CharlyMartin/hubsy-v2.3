import React from 'react';
// import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

// import '../css/pages/home.css'


class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: this.props.pageContext.locale,
      prefix: this.props.pageContext.prefix,
      static: this.props.pageContext.data,
      shopData: this.props.data.allAirtable.edges
    }
  }

  prefixLocale(path) {
    return `${this.state.prefix}${path}`;
  }
  
  render() {
    console.log(this.props);
    return (
      <Layout prefix={this.state.prefix} locale={this.state.locale}>
        <div className="container container-margin">
          <h1>{this.state.static.name}</h1>
        </div>
      </Layout>
    )
  }
}
  
export default ShopPage;

// Two sources of data for this component:
// - props.pageContext => coming from the createPage() action in gatsby-node
// - props.data => coming from the page Query below


export const query = graphql`
  {
    allAirtable(filter: {table: {eq: "shop_page"}}) {
      edges {
        node {
          data {
            language
            description
            direction
            hours
            prices
            contact
            amenities
            button_1
            button_2
            nearby
          }
        }
      }
    }
  }
`
