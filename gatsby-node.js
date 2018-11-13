const fetch = require('./data-functions.js');
const path = require('path');
const languagePath = {'fr': '/', 'en': '/en/',}
// console.log(fetch)hTEMPLATES
const homePage = path.resolve(`src/templates/home.jsx`);
const shopsPage = path.resolve(`src/templates/shops.jsx`);
const shopPage = path.resolve(`src/templates/shop.jsx`);
const pricingPage = path.resolve(`src/templates/pricing.jsx`);
const conceptPage = path.resolve(`src/templates/concept.jsx`);
const roomsPage = path.resolve(`src/templates/rooms.jsx`);
const baristaPage = path.resolve(`src/templates/barista.jsx`);


// FUNCTIONS (PULLING DATA FROM AIRTABLE)
// function fetchHomePage(lang, graphql) {
//   const promise = new Promise(function(resolve) {
//     resolve(
//       graphql(`
//         {
//           allAirtable(filter: {table: {eq: "home_page"}, data: {language: {eq: "${lang}"}}}) {
//             edges {
//               node {
//                 data {
//                   brand
//                   caption
//                   button
//                   referrals
//                   pictures {
//                     url
//                   }
//                   concept
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


// function fetchShopsPage(lang, graphql) {
//   const promise = new Promise(function(resolve) {
//     resolve(
//       graphql(`
//         {
//           allAirtable(filter: {table: {eq: "shops_page"}, data: {language: {eq: "${lang}"}}}) {
//             edges {
//               node {
//                 data {
//                   title
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


// function fetchShopPage(lang, graphql) {
//   const promise = new Promise(function(resolve) {
//     resolve(
//       graphql(`
//         {
//           allAirtable(filter: {table: {eq: "shop_page"}, data: {language: {eq: "${lang}"}}}) {
//             edges {
//               node {
//                 data {
//                   description
//                   language
//                   direction
//                   hours
//                   prices
//                   contact
//                   amneties
//                   button_1
//                   button_2
//                   nearby
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


// function fetchShopsData(lang, graphql) {
//   const promise = new Promise(function(resolve) {
//     resolve(
//       graphql(`
//         {
//           allAirtable(filter: {table: {eq: "shops"}, data: {language: {eq: "${lang}"}}}) {
//             edges {
//               node {
//                 data {
//                   name
//                   description
//                   language
//                   address
//                   postcode
//                   city
//                   status
//                   pictures {
//                     url
//                   }
//                   hours_weekdays
//                   hours_weekend
//                   price
//                   phone
//                   email
//                   internet
//                   food
//                   coffee
//                   transport
//                   drinks
//                   room
//                   screen
//                   printer
//                   slug
//                   meeting_rooms
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



exports.createPages = ({ graphql, actions }) => {
  // The Gatsby API “createPages” is called once the
  // data layer is bootstrapped to let plugins create pages from data.
  const { createPage, createNode } = actions;

  console.log("Page creation starting 💪");
  // Start of the loop to create pages in fr / en
  Object.entries(languagePath).forEach( ([locale, prefix]) => {

    // HOME PAGE
    fetch.homePage(locale, graphql)
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
          console.log(`${prefix} - built`);
        });
      });


    // SHOPS PAGE
    fetch.shopsPage(locale, graphql)
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
          console.log(`${url} - built`);
        });
      });


    // SHOP PAGE
    fetch.shopsData(locale, graphql)
      .then(response => {
        const results = response.data.allAirtable.edges;
        // console.log(results);
        results.forEach((result => {
          const url = `${prefix}shops/${result.node.data.slug}`
          const obj = {
            path: url,
            component: shopPage,
            context: {
              locale,
              prefix,
              data: result.node.data
            }
          };
          createPage(obj);
          console.log(`${url} - built`);
        }))
      })

    fetch.pricingPage(locale, graphql)
      .then(response => {
        const results = response.data.allAirtable.edges;
        results.forEach(result => {
          const url = `${prefix}pricing`;
          const obj = {
            path: url,
            component: pricingPage,
            context: {
              locale,
              prefix,
              data: result.node.data
            }
          };
          createPage(obj);
          console.log(`${url} - built`);
        });
      });

    // return;
  });
  // End of the loop
  console.log('All pages built 🎉');
};




// Test
// exports.onPreBootstrap = () => {
//   console.log("onPreBootstrap hook test")
// }
