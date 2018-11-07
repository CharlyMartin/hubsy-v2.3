import React from "react"
import { graphql } from "gatsby"

export default (props) => (
  <div>
    {console.log(props)}
    <h1>About</h1>
    <p>We're a very cool website you should return to often.</p>
  </div>
)

export const query = graphql`
  query {
    site {
      siteMetadata
    }
  }
`

// export const query = graphql`
//   query Navbar {
//     allAirtable(filter: {table: {eq: "navbar"}}) {
//       edges {
//         node {
//           data {
//             concept
//             rooms_all
//             shops_all
//             language
//             barista_training
//             privatize
//             book
//             privatize_text
//             pricing
//             book_text
//             buy_coffee
//             blog
//           }
//         }
//       }
//     }
//   }
// `
  

// export default Navbar;