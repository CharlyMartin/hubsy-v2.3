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
const languagePath = {'fr': '/', 'en': '/en',}

// The Gatsby API “createPages” is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  // PAGES
  const home = path.resolve(`src/pages/home.jsx`);
  const shops = path.resolve(`src/pages/shops.jsx`);

  // TEMPLATES


  // FUNCTIONS
  function fetchHomeData(lang) {
    const promise = new Promise(function(resolve) {
      resolve(
        graphql(`
          {
            allAirtable(filter: {table: {eq: "home_page"}, data: {language: {eq: "${lang}"}}}) {
              edges {
                node {
                  data {
                    brand
                    caption
                    button
                    referrals
                    pictures {
                      url
                    }
                    concept
                    language
                  }
                }
              }
            }
          }
        `)
      )
    })
    return promise;
  }

  // Creating pages for "/" and "/en"
  Object.entries(languagePath).forEach( ([locale, prefix]) => {

    fetchHomeData(locale)
      .then(response => {
        const results = response.data.allAirtable.edges;
        results.forEach(result => {
          // Home page
          createPage({
            path: prefix,
            component: home,
            context: {
              locale,
              prefix,
              data: result.node.data
            }
            // Add optional context data, available at this.props.pageContext
            // Data can be used as arguments to the page GraphQL query.
          });
          console.log(`${prefix} for ${locale.toUpperCase()} built 🎉`);
        });
      })



    // Shops page
    // createPage({
    //   path: `${prefix}/shops`,
    //   component: shops,
    //   context: {locale, prefix}
    // })
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
