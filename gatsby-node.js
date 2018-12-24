const path = require('path');
const fetch = require('./src/data/airtable-queries');
const nav = require('./src/data/internal-links');


// Page template components
const homePage = path.resolve(`src/templates/home.jsx`);
const shopsPage = path.resolve(`src/templates/shops.jsx`);
const shopPage = path.resolve(`src/templates/shop.jsx`);
const pricingPage = path.resolve(`src/templates/pricing.jsx`);
const aboutPage = path.resolve(`src/templates/about.jsx`);
const roomsPage = path.resolve(`src/templates/rooms.jsx`);
const baristaPage = path.resolve(`src/templates/barista-training.jsx`);
const cgvPage = path.resolve(`src/templates/cgv.jsx`);
const mlPage = path.resolve(`src/templates/ml.jsx`);


// Page creations
exports.createPages = ({ graphql, actions }) => {
  // The Gatsby API “createPages” is called once the
  // data layer is bootstrapped to let plugins create pages from data.
  const { createPage } = actions;

  // Function creating pages from parameters provided
  function createPageFrom(response, pathname, component, locale, prefix) {
    response.data.allAirtable.edges.forEach(result => {

      createPage({
        path: `${prefix}${pathname}`,
        component,
        context: {
          locale,
          prefix,
          pathname,
          data: result.node.data
        }
      })

      console.log(`built: ${prefix}${pathname}`);
    });
  }
  
  // Function creates slugs from names
  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace('é', 'e')
      .replace('à', 'a')
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      // .replace(/^-+/, '') // Trim - from start of text
      // .replace(/-+$/, '') // Trim - from end of text
  }


  // Start of the loop to create pages in "fr" & "en"
  Object.entries({'fr': '/', 'en': '/en/'}).forEach( ([locale, prefix]) => {

    fetch.homePage(locale, graphql)
      .then(resp => createPageFrom(resp, nav.home.path, homePage, locale, prefix));

    fetch.shopsPage(locale, graphql)
      .then(resp => createPageFrom(resp, nav.shops.path, shopsPage, locale, prefix));

    fetch.pricingPage(locale, graphql)
      .then(resp => createPageFrom(resp, nav.pricing.path, pricingPage, locale, prefix));

    fetch.aboutPage(locale, graphql)
      .then(resp => createPageFrom(resp, nav.about.path, aboutPage, locale, prefix));

    fetch.roomsPage(locale, graphql)
      .then(resp => createPageFrom(resp, nav.rooms.path, roomsPage, locale, prefix));

    fetch.baristaPage(locale, graphql)
      .then(resp => createPageFrom(resp, nav.barista.path, baristaPage, locale, prefix));
    
    // Shop pages based on slugs in shops table
    fetch.shopsData(locale, graphql)
      .then(response => {
        response.data.allAirtable.edges.forEach((result => {
          const pathname = `shops/${result.node.data.slug}`;
          console.log(slugify(result.node.data.name));
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
    path: nav.cgv.path,
    component: cgvPage,
    context: {
      locale: "fr",
      prefix: "/"
    }
  })
  console.log(`built: ${nav.cgv.path}`);

  createPage({
    path: nav.ml.path,
    component: mlPage,
    context: {
      locale: "fr",
      prefix: "/"
    }
  });
  console.log(`built: ${nav.ml.path}`);
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
