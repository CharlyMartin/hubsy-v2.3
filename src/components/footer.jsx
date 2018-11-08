import React from 'react';
import { StaticQuery, graphql } from "gatsby";
// import { Link } from 'gatsby'

function extractObject(array, lang = 'fr') {
  // Components are called internally during the build sequence,
  // making locale = undefined which returns an empty object and fail the build.
  // The default params 'fr' prevents that!
  // console.log(array, lang);
  return array.filter(obj => obj.node.data.language === lang);
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
      const array = data.allAirtable.edges;
      const obj = extractObject(array, props.locale);
      const content = obj[0].node.data;

      return (
        <h1>This is a Footer in {content.language}</h1>
      )}
    }
  />)
}