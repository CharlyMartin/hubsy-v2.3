const path = require('path');
const languagePath = {'fr': '/', 'en': '/en/',}

// PAGES
const homePage = path.resolve(`src/templates/home.jsx`);
const shopsPage = path.resolve(`src/templates/shops.jsx`);

// TEMPLATES

// The Gatsby API “createPages” is called once the
// data layer is bootstrapped to let plugins create pages from data.

// Start of the loop
exports.createPages = ({ graphql, actions }) => {
  const { createPage, createNode } = actions;

  // DATA FUNCTIONS
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

  function fetchShopsData(lang) {
    const promise = new Promise(function(resolve) {
      resolve(
        graphql(`
          {
            allAirtable(filter: {table: {eq: "shops_page"}, data: {language: {eq: "${lang}"}}}) {
              edges {
                node {
                  data {
                    title
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

  // function fetchNavbarData(lang) {
  //   const promise = new Promise(function(resolve) {
  //     resolve(
  //       graphql(`
  //         {
  //           allAirtable(filter: {table: {eq: "navbar"}, data: {language: {eq: "${lang}"}}}) {
  //             edges {
  //               node {
  //                 data {
  //                   venues
  //                   booking
  //                   book
  //                   book_text
  //                   privatize
  //                   privatize_text
  //                   pricing
  //                   concept
  //                   blog
  //                   coffee
  //                   barista
  //                   language
  //                 }
  //               }
  //             }
  //           }
  //         }        
  //       `)
  //     )
  //   })
  //   return promise;
  // }

  // Creating pages for "/" and "/en"
  Object.entries(languagePath).forEach( ([locale, prefix]) => {

    // HOME PAGES CREATION
    fetchHomeData(locale)
      .then(response => {
        const results = response.data.allAirtable.edges;
        results.forEach(result => {
          const obj = {
            path: prefix,
            component: homePage,
            context: {
              locale,
              prefix,
              data: result.node.data
            }
          };
          createPage(obj);
          console.log(`${prefix} built 🎉`);
        });
      });

    // HOME PAGES CREATION
    fetchShopsData(locale)
    .then(response => {
      const results = response.data.allAirtable.edges;
      results.forEach(result => {
        const url = `${prefix}shops`;
        const obj = {
          path: url,
          component: shopsPage,
          context: {
            locale,
            prefix,
            data: result.node.data
          }
        };
        createPage(obj);
        console.log(`${url} built 🎉`);
      });
    });


    // // NAVBAR NODES CREATION
    // fetchNavbarData(locale)
    //   .then(response => {
    //     const results = response.data.allAirtable.edges;
    //     results.forEach(result => {

    //       createNode({
    //         id: `${locale}`,
    //         data: result.node.data,
    //         internal: {
    //           type: `Navbar`,
    //           contentDigest: `navbar node in ${locale}`
    //         }
    //       });
    //       console.log(`navbar for ${prefix} loaded 🎉`);
    //     });            
    //   });

    return;
  });
};
// End of the loop

// Test
// exports.onPreBootstrap = () => {
//   console.log("onPreBootstrap hook test")
// }
