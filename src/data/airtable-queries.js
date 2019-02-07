// FUNCTIONS PULLING DATA FROM AIRTABLE
module.exports = {
  homeQuery: function(lang, graphql) {
    // The graphql function already returns a Promise so wrapping it
    // around a Promise is not necessary.
    console.log(`running homeQuery for ${lang}`);
    return graphql(`
      {
        allAirtable(filter: {table: {eq: "home_page"}, data: {language: {eq: "${lang}"}}}) {
          edges {
            node {
              data {
                brand
                caption
                button
                referrals
                google_reviews
                testimonials
                pictures {
                  url
                }
                concept
                alert
                alert_message
                language
                seo_title
                seo_description
              }
            }
          }
        }
      }
    `)
  },

  shopsQuery: function(lang, graphql) {
    console.log(`running shopsQuery for ${lang}`);
    return graphql(`
      {
        allAirtable(filter: {table: {eq: "shops_page"}, data: {language: {eq: "${lang}"}}}) {
          edges {
            node {
              data {
                title
                language
                seo_title
                seo_description
              }
            }
          }
        }
      }
    `)
  },

  shopQuery: function(lang, graphql) {
    console.log(`running shopsQuery for ${lang}`);
    return graphql(`
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
                seo_title
                seo_description
              }
            }
          }
        }
      }
    `)
  },

  pricingQuery: function(lang, graphql) {
    console.log(`running pricingQuery for ${lang}`);
    return graphql(`
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
              loyalty_1
              loyalty_2
              loyalty_3
              loyalty_4

              week_title
              week_subtitle
              week_price
              week_1
              week_2
              week_3
              week_4

              month_title
              month_subtitle
              month_price
              month_1
              month_2
              month_3
              month_4

              button_1
              button_2
              excluding_tax
              seo_title
              seo_description
              }
            }
          }
        }
      }
    `)
  },

  aboutQuery: function(lang, graphql) {
    console.log(`running aboutQuery for ${lang}`);
    return graphql(`
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

                seo_title
                seo_description
              }
            }
          }
        }
      }        
    `)
  },

  roomsQuery: function(lang, graphql) {
    console.log(`running roomsQuery for ${lang}`);
    return graphql(`
      {
        allAirtable(filter: {table: {eq: "rooms_page"}, data: {language: {eq: "${lang}"}}}) {
          edges {
            node {
              data {
                title
                subtitle
                language
                privatise
                capacity
                button
                seo_title
                seo_description
              }
            }
          }
        }
      }        
    `)
  },

  baristaQuery: function(lang, graphql) {
    console.log(`running baristaQuery for ${lang}`);
    return graphql(`
      {
        allAirtable(filter: {table: {eq: "barista_page"}, data: {language: {eq: "${lang}"}}}) {
          edges {
            node {
              data {
                title
                subtitle
                subtitle_2
                button
                language
                picture {
                  url
                }

                description
                training_1_title
                training_1_subtitle
                training_1_picture {
                  url
                }
                training_1_pdf {
                  url
                }

                training_2_title
                training_2_subtitle
                training_2_picture {
                  url
                }
                training_2_pdf {
                  url
                }
                seo_title
                seo_description
              }
            }
          }
        }
      }             
    `)
  }

}