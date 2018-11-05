module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
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
        apiKey: `keyLJFjUKsl2jfxfA`, // may instead specify via env, see below
        tables: [
          // baseId = Content
          {
            baseId: `appjg3ShOoZQxtkqi`,
            tableName: `navbar`,
            tableView: `test`,
            // queryName: `OPTIONAL_NAME_TO_IDENTIFY_TABLE`, // optional
            // mapping: { `CASE_SENSITIVE_COLUMN_NAME`: `VALUE_FORMAT` }, // optional, e.g. "text/markdown", "fileNode"
            // tableLinks: [`CASE`, `SENSITIVE`, `COLUMN`, `NAMES`] // optional, for deep linking to records across tables.
          },
        ]
      }
    },
    // i18n config
    {
      resolve: 'gatsby-plugin-i18n',
      options: {        
        langKeyDefault: 'fr',
        useLangKeyLayout: false
      }
    }
  ],
}
