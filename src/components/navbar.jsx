// import React from 'react'
// import { StaticQuery, graphql } from "gatsby"
// // import { Link } from 'gatsby'

// const Navbar = (props) =>  {
//   return <StaticQuery
//     query={graphql`
//       {
//         allAirtable(filter: {table: {eq: "navbar_comp"}, data: {language: {eq: "${props.locale}"}}}) {
//           edges {
//             node {
//               data {
//                 concept
//                 rooms_all
//                 shops_all
//                 language
//                 barista_training
//                 privatize
//                 book
//                 privatize_text
//                 pricing
//                 book_text
//                 buy_coffee
//                 blog
//               }
//             }
//           }
//         }
//       }
//     `}

//     render={data => (
//       <h1>This is a Navbar</h1>
//     )}
//   />
// }
  
// export default Navbar;