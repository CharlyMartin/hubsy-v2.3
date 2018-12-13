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
                    google
                    testimonials
                    pictures {
                      url
                    }
                    concept
                    alert
                    alert_message
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
                    live
                    status_short
                    status_long
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
                  subtitle_1
                  subtitle_2
                  language
                  hour_first
                  hour_extra
                  hour_cap
                  hour_students
                  benefit_main
                  benefit_2
                  benefit_3

                  loyalty_title
                  loyalty_subtitle
                  loyalty_price
                  loyalty_button

                  week_title
                  week_subtitle
                  week_price
                  week_button

                  month_title
                  month_subtitle
                  month_price
                  month_button

                  button_1
                  excluding_tax
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