const fetch = require('./data-functions.js');
const path = require('path');

// Page templates
const homePage = path.resolve(`src/templates/home.jsx`);
const shopsPage = path.resolve(`src/templates/shops.jsx`);
const shopPage = path.resolve(`src/templates/shop.jsx`);
const pricingPage = path.resolve(`src/templates/pricing.jsx`);
const aboutPage = path.resolve(`src/templates/about.jsx`);
const roomsPage = path.resolve(`src/templates/rooms.jsx`);
const baristaPage = path.resolve(`src/templates/barista-training.jsx`);
const cgvPage = path.resolve(`src/templates/cgv.jsx`);
const mlPage = path.resolve(`src/templates/ml.jsx`);

// Promises

exports.createPages = ({ graphql, actions }) => {
  // The Gatsby API “createPages” is called once the
  // data layer is bootstrapped to let plugins create pages from data.
  const { createPage } = actions;

  // Function creating pages from parameters provided
  function createPageFrom(response, pathname, component, locale, prefix) {
    response.data.allAirtable.edges.forEach(result => {

      const obj = {
        path: `${prefix}${pathname}`,
        component,
        context: {
          locale,
          prefix,
          pathname,
          data: result.node.data
        }
      };
      createPage(obj);
      console.log(`built: ${prefix}${pathname}`);
    });
  }


  // Start of the loop to create pages in "fr" & "en"
  Object.entries({'fr': '/', 'en': '/en/'}).forEach( ([locale, prefix]) => {

    fetch.homePage(locale, graphql)
      .then(resp => createPageFrom(resp, '', homePage, locale, prefix));

    fetch.shopsPage(locale, graphql)
      .then(resp => createPageFrom(resp, 'shops', shopsPage, locale, prefix));

    fetch.pricingPage(locale, graphql)
      .then(resp => createPageFrom(resp, 'pricing', pricingPage, locale, prefix));

    fetch.aboutPage(locale, graphql)
      .then(resp => createPageFrom(resp, 'about', aboutPage, locale, prefix));

    fetch.roomsPage(locale, graphql)
      .then(resp => createPageFrom(resp, 'rooms', roomsPage, locale, prefix));

    fetch.baristaPage(locale, graphql)
      .then(resp => createPageFrom(resp, 'barista-training', baristaPage, locale, prefix));
    
    // Shop pages based on slugs in shops table
    fetch.shopsData(locale, graphql)
      .then(response => {
        response.data.allAirtable.edges.forEach((result => {
          const pathname = `shops/${result.node.data.slug}`
          const obj = {
            path: `${prefix}${pathname}`,
            component: shopPage,
            context: {
              locale,
              prefix,
              pathname,
              data: result.node.data
            }
          };
          createPage(obj);
          console.log(`built: ${prefix}${pathname}`);
        }))
      })

  }); // End of the loop


  // Creating CGV and ML in french only, so outside of the loop.
  createPage({
    path: 'conditions-generales-vente',
    component: cgvPage,
    context: {
      locale: "fr",
      prefix: "/"
    }
  })
  console.log(`built: /cgv`);

  createPage({
    path: 'mentions-legales',
    component: mlPage,
    context: {
      locale: "fr",
      prefix: "/"
    }
  });
  console.log(`built: /ml`);
};


// mapbox-gl expects global obj window to be available, but it's not during build sequence.
// This overrides the webpack config and doesn't run mapbox-gl code server-side.
exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /mapbox-gl/,
            use: ['null-loader']
          },
        ],
      }
    })
  }
};

// Test
// exports.onPreBootstrap = () => {
//   console.log("onPreBootstrap hook test")
// }
