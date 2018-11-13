// FUNCTIONS (PULLING DATA FROM AIRTABLE)

function fetchHomePage(lang, graphql) {
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
}


function fetchShopsPage(lang, graphql) {
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
}


// function fetchShopPage(lang, graphql) {
//   const promise = new Promise(function(resolve) {
//     resolve(
//       graphql(`
//         {
//           allAirtable(filter: {table: {eq: "shop_page"}, data: {language: {eq: "${lang}"}}}) {
//             edges {
//               node {
//                 data {
//                   description
//                   language
//                   direction
//                   hours
//                   prices
//                   contact
//                   amneties
//                   button_1
//                   button_2
//                   nearby
//                 }
//               }
//             }
//           }
//         }
//       `)
//     )
//   })
//   return promise;
// }


function fetchShopsData(lang, graphql) {
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
}