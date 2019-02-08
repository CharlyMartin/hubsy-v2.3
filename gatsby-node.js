// External Librairies
const path = require('path');
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

// External objects
const run = require('./src/data/airtable-queries');
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

// Local objects
const locales = {'fr': '/', 'en': '/en/'};

// Page creations
exports.createPages = async ({ graphql, actions, createNodeId, store, cache }) => {
  // The Gatsby API “createPages” is called once the
  // data layer is bootstrapped to let plugins create pages from data.
  const { createPage, createNode, createNodeField } = actions;

  // Function adding images to the Gastby's data layer (sourcesystem)
  async function addImagesToSource(array, parent, locale) {
    let counter = 1;

    for (const url of array) {
      const newNode = await createRemoteFileNode({
        url,
        store,
        cache,
        createNode,
        createNodeId,
      })
      
      const name = `airtable-${parent}-${locale}-${counter}`;

      createNodeField({
        node: newNode,
        name: `parentTable`,
        value: name,
      })

      newNode.name = name;
      counter++;
      console.log(`\n⚛️  ${newNode.name} (node)`);
    }
  }


  // Function extracting the urls of the images from the graphQL object
  function extractImagesURL(data, keys) {
    // keys is the name of keys that contain the pictures URL in the data obj
    return keys.map(key => data[key])
      .flat(2)
      .map(obj => obj.url);
  }

  async function createPagesFromSlug(r, pathname, component, locale, prefix, imageKeys = []) {    
    for (const i of r.data.allAirtable.edges) {
      // console.log(node);
      const pagePath = `${prefix}${pathname}/${i.node.data.slug}`;

      createPage({
        path: pagePath,
        component,
        context: {
          locale,
          prefix,
          pathname,
          data: i.node.data
        }
      })

      console.log(`\n📄 ${pagePath} (page)`);

      let imageURLs = await extractImagesURL(i.node.data, imageKeys);
      await addImagesToSource(imageURLs, i.node.data.slug, locale);
    }
  }

  // Function creating localised pages from parameters provided
  async function createSinglePage(r, pathname, component, locale, prefix, imageKeys = []) {
    const node = r.data.allAirtable.edges[0].node;
    const pagePath = `${prefix}${pathname}`;

    // Gatsby plugin to create pages from template components
    createPage({
      path: pagePath,
      component,
      context: {
        locale,
        prefix,
        pathname,
        data: node.data,
      }
    });

    console.log(`\n📄 ${pagePath} (page)`);

    const imageURLs = await extractImagesURL(node.data, imageKeys);
    return new Promise((resolve) => {
      resolve({imageURLs, locale})
    });
  };


  // Start of the loop to create pages in "fr" & "en"
  for (const array of Object.entries(locales)) {
    const [locale, prefix] = array;
    console.log(`\n🚀 Starting page creation for ${locale} - ${prefix}`);

    // Waiting for all images to be added to the source data layer
    await run.homeQuery(locale, graphql)
      .then(r => createSinglePage(r, pages.home, homePage, locale, prefix, ['pictures']))
      .then(r => addImagesToSource(r.imageURLs, 'home', locale));

    await run.shopsQuery(locale, graphql)
      .then(r => createSinglePage(r, pages.shops, shopsPage, locale, prefix));

    await run.pricingQuery(locale, graphql)
      .then(r => createSinglePage(r, pages.pricing, pricingPage, locale, prefix));

    await run.aboutQuery(locale, graphql)
      .then(r => createSinglePage(r, pages.about, aboutPage, locale, prefix))

    await run.roomsQuery(locale, graphql)
      .then(r => createSinglePage(r, pages.rooms, roomsPage, locale, prefix));

    await run.baristaQuery(locale, graphql)
      .then(r => createSinglePage(r, pages.barista, baristaPage, locale, prefix));

    await run.shopQuery(locale, graphql)
      .then(r => createPagesFromSlug(r, pages.shops, shopPage, locale, prefix, ['pictures']))
  }; // End of the loop


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
//   // console.log(`id: ${node.internal.id}`);
//   console.log(`type: ${node.name}`);
//   console.log(`type: ${node.internal.type}`);
//   // console.log(`parent: ${node.internal.parent}`);
//   // console.log(`contentDigest: ${node.internal.contentDigest}`);
//   // console.log(`children: ${node.internal.children}`);
//   // console.log(`mediaType: ${node.internal.mediaType}`);
//   // console.log(`content: ${node.internal.content}`);
//   // console.log(`description: ${node.internal.description}`);
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
