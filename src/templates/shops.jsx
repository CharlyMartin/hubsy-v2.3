import React from 'react';
import { graphql } from 'gatsby'

import Layout from '../components/layout';
import Card from '../components/card'
// import '../css/pages/home.css'

class ShopsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: this.props.pageContext.locale,
      prefix: this.props.pageContext.prefix,
      static: this.props.pageContext.data,
      shopsData: this.props.data.allAirtable.edges
    }
  }

  prefixLocale(path) {
    return `${this.state.prefix}${path}`;
  }

  renderCards(array, locale) {
    return (
      <div className="cards">
        {array.map(obj => {
          return (
            <Card
              key={obj.node.data.record_id}
              data={obj.node.data}
              locale={locale} />
          )
        } )}
      </div>  
    )
  }

  extractObjects(array, lang = 'fr') {
    // Components are called internally during the build sequence,
    // and doesn't pass a locale arg, which makes it undefined.
    // Hence the function returns an empty object and fails the build process.
    // The default params 'fr' prevents that!
    return array.filter(obj => obj.node.data.language === lang);
  }
  
  render() {
    const localisedArray = this.extractObjects(this.state.shopsData, this.state.locale);
    console.log(localisedArray);

    return (
      <Layout prefix={this.state.prefix} locale={this.state.locale}>
        <div className="container container-margin">
          <h1>{this.state.static.title}</h1>
          <div>
            {this.renderCards(localisedArray, this.state.prefix)}
          </div>
        </div>
      </Layout>
    )
  }
}
  
export default ShopsPage;

// Two sources of data for this component:
// - props.pageContext => coming from the createPage() action in gatsby-node
// - props.data => coming from the page Query below

export const query = graphql`
  {
    allAirtable(filter: {table: {eq: "shops"}}) {
      edges {
        node {
          data {
            record_id
            language
            name
            address
            status
            slug
            pictures {
              url
            }
          }
        }
      }
    }
  }
`
