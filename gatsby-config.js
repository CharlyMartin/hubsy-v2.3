const apiKey = `keyLJFjUKsl2jfxfA`;
const defaultView = `Grid view`
const contentBaseId = `appjg3ShOoZQxtkqi`

module.exports = {
  siteMetadata: {
    title: 'Hubsy | Café & Coworking',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
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
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    // Airtable config
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: apiKey, // may instead specify via env, see below
        tables: [
          // baseId = Content
          {
            baseId: contentBaseId,
            tableName: `navbar`,
            tableView: defaultView,
            // queryName: `OPTIONAL_NAME_TO_IDENTIFY_TABLE`, // optional
            // mapping: { `CASE_SENSITIVE_COLUMN_NAME`: `VALUE_FORMAT` }, // optional, e.g. "text/markdown", "fileNode"
            // tableLinks: [`CASE`, `SENSITIVE`, `COLUMN`, `NAMES`] // optional, for deep linking to records across tables.
          },
          {
            baseId: contentBaseId,
            tableName: `footer`,
            tableView: defaultView,
          },
          {
            baseId: contentBaseId,
            tableName: `home_page`,
            tableView: defaultView,
          },
        ]
      }
    },
    // i18n config
    // {
    //   resolve: 'gatsby-plugin-i18n',
    //   options: {        
    //     langKeyDefault: 'fr',
    //     useLangKeyLayout: false
    //   }
    // }
  ],
}
