/**
 * Implement Gatsby's Node APIs in this file.
 *
 * NODE API
 * https://www.gatsbyjs.org/docs/node-apis/
 * 
 * EXAMPLE NO GRAPHQL
 * https://www.gatsbyjs.org/blog/2018-10-25-unstructured-data/#1-use-gatsbys-createpages-api
 * 
 * GH REPOS
 * https://github.com/gatsbyjs/gatsby/issues/3025
 * https://github.com/gatsbyjs/gatsby/issues/2957
 * 
 * LAYOUT VS COMPONENT
 * https://www.gatsbyjs.org/blog/2018-06-08-life-after-layouts/
 */

const path = require('path');
const languagePath = {
  'fr': '/',
  'en': '/en',
}

// The Gatsby API “createPages” is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const home = path.resolve(`src/pages/home.jsx`);
  const shops = path.resolve(`src/pages/shops.jsx`);
  
  Object.entries(languagePath).forEach( ([locale, path]) => {
    // console.log(locale, path);
    
    // Home page
    createPage({
      path: path,
      component: home,
      context: {
        locale
      }
      // Add optional context data, available at this.props.pageContext
      // Data can be used as arguments to the page GraphQL query.
    })

    // Shops page
    createPage({
      path: `${path}/shops`,
      component: shops,
      context: {
        test: `hello from context`,
        locale: locale
      }
    })
    return;
  });
};



// {
//   allAirtable(filter: {table: {eq: "navbar"}}) {
//     edges {
//       node {
//         data {
//           concept
//           rooms_all
//           shops_all
//           language
//           barista_training
//           privatize
//           book
//           privatize_text
//           pricing
//           book_text
//           buy_coffee
//           blog
//         }
//       }
//     }
//   }
// }
