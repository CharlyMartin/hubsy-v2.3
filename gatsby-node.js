const fetch = require('./data-functions.js');
const path = require('path');

// Page templates
const shopsPage = path.resolve(`src/templates/shops.jsx`);
const shopPage = path.resolve(`src/templates/shop.jsx`);
const pricingPage = path.resolve(`src/templates/pricing.jsx`);
const aboutPage = path.resolve(`src/templates/about.jsx`);
const roomsPage = path.resolve(`src/templates/rooms.jsx`);
const baristaPage = path.resolve(`src/templates/barista-training.jsx`);

// Page Object Template
function buildPageObj(url, comp, lang, pref, d) {
  return {
    path: url,
    component: comp,
    context: {
      locale: lang,
      prefix: pref,
      data: d
    }
  }
}

exports.createPages = ({ graphql, actions }) => {
  // The Gatsby API “createPages” is called once the
  // data layer is bootstrapped to let plugins create pages from data.
  const { createPage } = actions;

  console.log("Page creation starting 💪");
  // Start of the loop to create pages in fr / en
  const languagePath = {'fr': '/', 'en': '/en/',}
  Object.entries(languagePath).forEach( ([locale, prefix]) => {

    fetch.homePage(locale, graphql)
      .then(response => {
        const page = path.resolve(`src/templates/home.jsx`);
        const results = response.data.allAirtable.edges;
        
        results.forEach(result => {
          const url = prefix;
          const obj = buildPageObj(url, page, locale, prefix, result.node.data);
          createPage(obj);
          console.log(`built: ${prefix}`);
        });
      });

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
          console.log(`built: ${url}`);
        });
      });
    
    // Shop pages based on slugs in shops table
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
          console.log(`built: ${url}`);
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
          console.log(`built: ${url}`);
        });
      });

    fetch.aboutPage(locale, graphql)
      .then(response => {
        const results = response.data.allAirtable.edges;
        results.forEach(result => {
          const url = `${prefix}about`;
          const obj = {
            path: url,
            component: aboutPage,
            context: {
              locale,
              prefix,
              data: result.node.data
            }
          };
          createPage(obj);
          console.log(`built: ${url}`);
        });
      });

    fetch.roomsPage(locale, graphql)
      .then(response => {
        const results = response.data.allAirtable.edges;
        results.forEach(result => {
          const url = `${prefix}rooms`;
          const obj = {
            path: url,
            component: roomsPage,
            context: {
              locale,
              prefix,
              data: result.node.data
            }
          };
          createPage(obj);
          console.log(`built: ${url}`);
        });
      });

    fetch.baristaPage(locale, graphql)
      .then(response => {
        const results = response.data.allAirtable.edges;
        results.forEach(result => {
          const url = `${prefix}barista-training`;
          const obj = {
            path: url,
            component: baristaPage,
            context: {
              locale,
              prefix,
              data: result.node.data
            }
          };
          createPage(obj);
          console.log(`built: ${url}`);
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
