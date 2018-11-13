// FUNCTIONS (PULLING DATA FROM AIRTABLE)
module.exports = {

   homePage: function(lang, graphql) {
    const promise = new Promise(function(resolve) {
      resolve(
        graphql(`
          {
            allAirtable(filter: {table: {eq: "home_page"}, data: {language: {eq: "${lang}"}}}) {
              edges {
                node {
                  data {
                    brand
                    caption
                    button
                    referrals
                    pictures {
                      url
                    }
                    concept
                    language
                  }
                }
              }
            }
          }
        `)
      )
    })
    return promise;
  },

  shopsPage: function(lang, graphql) {
    const promise = new Promise(function(resolve) {
      resolve(
        graphql(`
          {
            allAirtable(filter: {table: {eq: "shops_page"}, data: {language: {eq: "${lang}"}}}) {
              edges {
                node {
                  data {
                    title
                  }
                }
              }
            }
          }
        `)
      )
    })
    return promise;
  },

  shopsData: function(lang, graphql) {
    const promise = new Promise(function(resolve) {
      resolve(
        graphql(`
          {
            allAirtable(filter: {table: {eq: "shops"}, data: {language: {eq: "${lang}"}}}) {
              edges {
                node {
                  data {
                    name
                    description
                    language
                    address
                    postcode
                    city
                    status
                    pictures {
                      url
                    }
                    hours_weekdays
                    hours_weekend
                    price
                    phone
                    email
                    internet
                    food
                    coffee
                    transport
                    drinks
                    room
                    screen
                    printer
                    slug
                    meeting_rooms
                  }
                }
              }
            }
          }
        `)
      )
    })
    return promise;
  },

  pricingPage: function(lang, graphql) {
    const promise = new Promise(function(resolve) {
      resolve(
        graphql(`
          {
            allAirtable(filter: {table: {eq: "pricing_page"}, data: {language: {eq: "${lang}"}}}) {
              edges {
                node {
                  data {
                  title
                    language
                    subtitle
                    member_title
                    member_subtitle
                    member_first
                    member_extra
                    member_cap
                    member_services
                    member_checkout
                    res_title
                    res_subtitle
                    res_prices
                    res_access
                    res_validity
                    res_services
                    res_checkout
                    button_1
                    button_2
                    rooms
                  }
                }
              }
            }
          }
        `)
      )
    })
    return promise;
  }

}