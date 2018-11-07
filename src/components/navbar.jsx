import React from 'react'
import { StaticQuery, graphql } from "gatsby"
// import { Link } from 'gatsby'

function extractLocalisedObject(arrays, lang) {
  const array = arrays.filter(array => array.node.data.language === lang);
  const innerObject = array[0];
  return innerObject;
}

// function extractData(object) {
//   return object.node.data;
// }

export default (props) => {
  return (<StaticQuery
    query={graphql`
      query airtableNavbarData {
        allAirtable(filter: {table: {eq: "navbar"}}) {
          edges {
            node {
              data {
                language
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
              }
            }
          }
        }
      }
    `
    }

    render={(data) => {
      const arrays = data.allAirtable.edges;
      const object = extractLocalisedObject(arrays, props.locale);
      const content = object;

      console.log(content);
      return (
        <h1>This is a Navbar in</h1>
      )}
    }
  />)  
}
