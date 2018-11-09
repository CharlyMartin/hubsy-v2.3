import React from 'react';
import { StaticQuery, graphql } from "gatsby";
// import { Link } from 'gatsby'

import '../css/components/footer.css'

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  extractObject(array, lang = 'fr') {
    return array.filter(obj => obj.node.data.language === lang);
  }
  
  render() {
    const array = this.props.data.allAirtable.edges;
    const obj = this.extractObject(array, this.props.locale);
    const content = obj[0].node.data;

    return (
      <div>
        <div className="footer">
          <div className="container">
            <h1>This is a Footer in {content.language}</h1>
          </div>
        </div>
      </div>
    )
  }
}


export default (props) => {
  return (<StaticQuery
    query={graphql`
      query {
        allAirtable(filter: {table: {eq: "footer"}}) {
          edges {
            node {
              data {
                venues
                booking
                book
                book_text
                privatize
                privatize_text
                pricing
                concept
                blog
                coffee
                barista
                language
              }
            }
          }
        }
      }  
    `
    }

    render={(data) => {      
      return (
        <Footer data={data} locale={props.locale} />
      )}
    }
  />)
}