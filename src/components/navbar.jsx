import React from 'react'
// import { graphql } from 'gatsby'
// import { Link } from 'gatsby'

const Navbar = (props) => {
  return (
    <div>
      <h1>This is a Navbar in {props.locale}</h1>
    </div>
  )
}

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
  

export default Navbar
