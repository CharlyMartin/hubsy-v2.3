const path = require('path');
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

const fetch = require('./src/data/airtable-queries');
const pages = require('./src/data/internal-links');


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
exports.createPages = ({ graphql, actions, createNodeId, store, cache }) => {
  // The Gatsby API “createPages” is called once the
  // data layer is bootstrapped to let plugins create pages from data.
  const { createPage, createNode, createNodeField } = actions;

  // Function creating localised pages from parameters provided
  function createPageFrom(response, pathname, component, locale, prefix) {
    const node = response.data.allAirtable.edges[0].node;
    const pagePath = `${prefix}${pathname}`;
    console.log(`built: ${pagePath}`);

    createPage({
      path: pagePath,
      component,
      context: {
        locale,
        prefix,
        pathname,
        data: node.data
      }
    })
  };

    // response.data.allAirtable.edges.map(result => {
      
    //   const pagePath = `${prefix}${pathname}`;
    //   

    //   createPage({
    //     path: pagePath,
    //     component,
    //     context: {
    //       locale,
    //       prefix,
    //       pathname,
    //       data: result.node.data
    //     }
    //   })

    //   // const promise = new Promise(function(resolve, reject) {
    //   //   resolve(result.node.data.pictures);
    //   // });

    //   // return promise;

    //   // // Pathname for home is empty string
    //   // if (pathname === '') {
    //   //   const pictures = result.node.data.pictures;
    //   //   // console.log(pictures);
    //   //   pictures.forEach(picture => {
    //   //     console.log(picture.url);
          
    //   //     // https://www.gatsbyjs.org/packages/gatsby-source-filesystem/#createremotefilenode
    //   //     createRemoteFileNode({
    //   //       url: picture.url, // The source url of the remote file
    //   //       store,
    //   //       cache,
    //   //       createNode,
    //   //       createNodeId,
    //   //     }).then(node => {
    //   //       node.sourceInstanceName = `${prefix}${pathname}`;
    //   //       console.log(node);
    //   //       // createNodeField({
    //   //       //   node,
    //   //       //   name: `parent`,
    //   //       //   value: `${prefix}${pathname}`
    //   //       // })
    //   //     });
    //   //     // console.log('HEEEELLLLOOOOO')
    //   //   })
    //   // };
    // });

  // Start of the loop to create pages in "fr" & "en"
  Object.entries({'fr': '/', 'en': '/en/'}).forEach( ([locale, prefix]) => {

    fetch.homePage(locale, graphql)
      .then(resp => createPageFrom(resp, pages.home, homePage, locale, prefix));

    fetch.shopsPage(locale, graphql)
      .then(resp => createPageFrom(resp, pages.shops, shopsPage, locale, prefix));

    fetch.pricingPage(locale, graphql)
      .then(resp => createPageFrom(resp, pages.pricing, pricingPage, locale, prefix));

    fetch.aboutPage(locale, graphql)
      .then(resp => createPageFrom(resp, pages.about, aboutPage, locale, prefix));

    fetch.roomsPage(locale, graphql)
      .then(resp => createPageFrom(resp, pages.rooms, roomsPage, locale, prefix));

    fetch.baristaPage(locale, graphql)
      .then(resp => createPageFrom(resp, pages.barista, baristaPage, locale, prefix));
    
    // Shop pages based on slugs in shops table
    fetch.shopsData(locale, graphql)
      .then(response => {
        response.data.allAirtable.edges.forEach((result => {
          const pathname = `${pages.shops}/${result.node.data.slug}`;
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
    path: pages.cgv,
    component: cgvPage,
    context: {
      locale: "fr",
      prefix: "/"
    }
  })
  console.log(`built: ${pages.cgv}`);

  createPage({
    path: pages.ml,
    component: mlPage,
    context: {
      locale: "fr",
      prefix: "/"
    }
  });
  console.log(`built: ${pages.ml}`);



  // Node creation test.
  // This create a new node available through allFileNode
  // createNode({
  //   // Data for the node.
  //   field1: `a string`,
  //   field2: 10,
  //   field3: true,
  
  //   // Required fields.
  //   id: `a-node-id`,
  //   parent: null, // or null if it's a source node without a parent
  //   children: [],
  //   internal: {
  //     type: `fileNode`,
  //     contentDigest: "contentDigest",
  //     mediaType: `image/jpeg`, // optional
  //     content: `test`, // optional
  //     description: `Cool Service: "Title of entry"`, // optional
  //   }
  // })
};

// exports.onCreateNode = ({ node, actions }) => {
//   const { createNode, createNodeField } = actions
//   console.log(`NEW NODE`);
//   console.log(`id: ${node.internal.id}`)
//   console.log(`type: ${node.internal.type}`)
//   console.log(`parent: ${node.internal.parent}`)
//   console.log(`contentDigest: ${node.internal.contentDigest}`)
//   console.log(`children: ${node.internal.children}`)
//   console.log(`mediaType: ${node.internal.mediaType}`)
//   console.log(`content: ${node.internal.content}`)
//   console.log(`description: ${node.internal.description}`)
//   console.log(`---------------------`);
//   // Transform the new node here and create a new node or
//   // create a new node field.
// }

// Only works for the 404 page, not the templates.
// exports.onCreatePage = ({ page, actions }) => {
//   console.log(page);
//   // const { createPage, deletePage } = actions

//   // deletePage(page)
//   // // You can access the variable "house" in your page queries now
//   // createPage({
//   //   ...page,
//   //   context: {
//   //     house: Gryffindor,
//   //   },
//   // })
// }

// exports.setFieldsOnGraphQLNodeType = ({ type }) => {
//   console.log(type);
//   // if (type.name === `File`) {
//   //   return {
//   //     newField: {
//   //       type: GraphQLString,
//   //       args: {
//   //         myArgument: {
//   //           type: GraphQLString,
//   //         }
//   //       },
//   //       resolve: (source, fieldArgs) => {
//   //         return `Id of this node is ${source.id}.
//   //                 Field was called with argument: ${fieldArgs.myArgument}`
//   //       }
//   //     }
//   //   }
//   // }

//   // by default return empty object
//   return {}
// }


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
