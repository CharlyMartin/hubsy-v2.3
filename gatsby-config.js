require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// window.env = NODE_ENV;

const readOnlyKey = process.env.AIRTABLE_API_KEY;
const contentBaseId = process.env.AIRTABLE_BASE_ID;
const viewAll = 'Grid view';


// const bases = [
//   'home_page',
//   'shops_page',
//   'shop_page',
//   'pricing_page',
//   'concept_page',
//   'rooms_page',
//   'barista_page',
//   'navbar',
//   'footer',
//   'shops',
//   'rooms'
// ]

// const airtableConfig = bases.map(page => {
//   return {
//     baseId: 'appjg3ShOoZQxtkqi',
//     tableName: page,
//     tableView: 'All'
//   }
// })

module.exports = {
  siteMetadata: {
    title: 'Hubsy | Café & Coworking',
    siteUrl: 'https://www.hubsy.fr'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/logo/logo.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    'gatsby-transformer-remark',
    // Airtable config
    // Split data into 2 tables: Pages + Shared (Navbar + Footer + Shops + Rooms)
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: readOnlyKey,
        tables: [
          // Pages
          // baseId: `YOUR_AIRTABLE_BASE_ID`,
          // tableName: `YOUR_TABLE_NAME`,
          // tableView: `YOUR_TABLE_VIEW_NAME`,
          // queryName: `OPTIONAL_NAME_TO_IDENTIFY_TABLE`, // optional
          // mapping: { `CASE_SENSITIVE_COLUMN_NAME`: `VALUE_FORMAT` }, // optional, e.g. "text/markdown", "fileNode"
          // tableLinks: [`CASE`, `SENSITIVE`, `COLUMN`, `NAMES`] // optional, for deep linking to records across tables.
          {
            baseId: contentBaseId,
            tableName: 'home_page',
            tableView: viewAll,
            // The mapping adds the image to the internal node system of Gatsby
            // mapping: { 'pictures': `fileNode` },
          },
          {
            baseId: contentBaseId,
            tableName: 'shops_page',
            tableView: viewAll,
          },
          {
            baseId: contentBaseId,
            tableName: 'shop_page',
            tableView: viewAll,
          },
          {
            baseId: contentBaseId,
            tableName: 'pricing_page',
            tableView: viewAll,
          },
          {
            baseId: contentBaseId,
            tableName: 'about_page',
            tableView: viewAll,
          },
          {
            baseId: contentBaseId,
            tableName: 'rooms_page',
            tableView: viewAll,
          },
          {
            baseId: contentBaseId,
            tableName: 'barista_page',
            tableView: viewAll,
            // mapping: {'picture': 'fileNode'}
          },
          {
            baseId: contentBaseId,
            tableName: 'navbar',
            tableView: viewAll,
          },
          {
            baseId: contentBaseId,
            tableName: 'footer',
            tableView: viewAll,
            tableLinks: ['linked_rooms'],
          },
          {
            baseId: contentBaseId,
            tableName: 'shops',
            tableView: viewAll,
            tableLinks: ['linked_rooms', 'footer'],
          },
          {
            baseId: contentBaseId,
            tableName: 'rooms',
            tableView: viewAll,
            tableLinks: ['belongs_to'],
          },
          {
            baseId: contentBaseId,
            tableName: 'cgv_page',
            tableView: viewAll,
            mapping: {'content_md': 'text/markdown'}
          },
          {
            baseId: contentBaseId,
            tableName: 'ml_page',
            tableView: viewAll,
            mapping: {'content_md': 'text/markdown'}
          },
        ]
      }
    }
  ]
}
