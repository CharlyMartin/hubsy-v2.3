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
                    testimonials
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
                    street
                    postcode
                    city
                    lat
                    lng
                    status
                    pictures {
                      url
                    }
                    hours_weekdays
                    hours_friday
                    hours_weekend
                    prices
                    phone
                    email
                    internet
                    food
                    coffee
                    metro
                    bus
                    drinks
                    booths
                    meeting_rooms
                    screen
                    printer
                    slug
                    linked_rooms
                    record_id
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
                    member_offer
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
  },

  aboutPage: function(lang, graphql) {
    const promise = new Promise(function(resolve) {
      resolve(
        graphql(`
          {
            allAirtable(filter: {table: {eq: "about_page"}, data: {language: {eq: "${lang}"}}}) {
              edges {
                node {
                  data {
                    title
                    subtitle
                    language
                    item_1_title
                    item_1_text
                    item_1_button
                    item_1_picture {
                      url
                    }
                    item_2_title
                    item_2_text
                    item_2_button
                    item_2_picture {
                      url
                    }
                    item_3_title
                    item_3_text
                    item_3_button
                    item_3_picture {
                      url
                    }
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

  roomsPage: function(lang, graphql) {
    const promise = new Promise(function(resolve) {
      resolve(
        graphql(`
          {
            allAirtable(filter: {table: {eq: "rooms_page"}, data: {language: {eq: "${lang}"}}}) {
              edges {
                node {
                  data {
                    title
                    subtitle
                    language
                    privatise
                    button
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

  baristaPage: function(lang, graphql) {
    const promise = new Promise(function(resolve) {
      resolve(
        graphql(`
          {
            allAirtable(filter: {table: {eq: "barista_page"}, data: {language: {eq: "${lang}"}}}) {
              edges {
                node {
                  data {
                    title
                    subtitle
                    language
                    picture {
                      url
                    }
                    description
                    youtube
                    training_1_title
                    training_1_subtitle
                    training_1_picture {
                      url
                    }
                    training_2_title
                    training_2_subtitle
                    training_2_picture {
                      url
                    }
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

}