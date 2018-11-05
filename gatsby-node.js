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
 */

const path = require('path');
const slash = require(`slash`);
const languagePath = {
  'fr': '/',
  'en': '/en',
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const index = path.resolve(`src/pages/index.jsx`);
  
  Object.entries(languagePath).forEach( ([locale, path]) => {
      console.log(locale, path);
      // Home page
      createPage({
        path: path,
        component: index,
        context: {locale}
        // Add optional context data. Data can be used as
        // arguments to the page GraphQL query.
      })
  });
};
