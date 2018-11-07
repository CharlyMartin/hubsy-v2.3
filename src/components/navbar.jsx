import React from 'react'
import { StaticQuery, graphql } from "gatsby"
// import { Link } from 'gatsby'

function extractLocalisedObject(arrays, lang) {
  const array = arrays.filter(array => array.node.data.language === lang);
  const innerObject = array[0];
  return innerObject;
}

export default (props) => {
  return (<StaticQuery
    query={graphql`
      query {
        allNavbar {
          edges {
            node {
              id
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
      const arrays = data.allNavbar.edges;
      const object = extractLocalisedObject(arrays, props.locale);
      const content = object.node.data;

      // console.log(content);
      return (
        <h1>This is a Navbar in {content.language}</h1>
      )}
    }
  />)  
}
