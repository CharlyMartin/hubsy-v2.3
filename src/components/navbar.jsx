import React from 'react';
import { StaticQuery, graphql } from "gatsby";
// import { Link } from 'gatsby'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  extractObject(array, lang = 'fr') {
    // Components are called internally during the build sequence,
    // making locale = undefined which returns an empty object and fail the build.
    // The default params 'fr' prevents that!
    // console.log(array, lang);
    return array.filter(obj => obj.node.data.language === lang);
  }
  
  render() {
    const array = this.props.data.allAirtable.edges;
    const obj = this.extractObject(array, this.props.locale);
    const content = obj[0].node.data;

    return (
      <div>
        <h1>This is a Navbar in {content.language}</h1>
        <ul>
          <li>{content.venues}</li>
          <li>{content.booking}</li>
          <li>{content.pricing}</li>
          <li>{content.blog}</li>
        </ul>
      </div>
    )
  }
}


export default (props) => {
  return (<StaticQuery
    query={graphql`
      query {
        allAirtable(filter: {table: {eq: "navbar"}}) {
          edges {
            node {
              data {
                venues
                booking
                book
                book_text
                privatize
                privatize_text
                pricing
                concept
                blog
                coffee
                barista
                language
              }
            }
          }
        }
      }  
    `
    }

    render={(data) => {      
      return (
        <Navbar data={data} locale={props.locale} />
      )}
    }
  />)
}


// class Navbar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fr: {},
//       en: {}
//     }
//   }
  
//   componentDidMount() {
//     var Airtable = require('airtable');
//     var base = new Airtable({apiKey: 'key7nPLJ4faTkoF4S'}).base('appjg3ShOoZQxtkqi');

//     base('navbar').select({maxRecords: 10,})
//       .eachPage(function page(records) {
//         records.forEach(function(record) {
//         console.log(record.fields);

//         record.fields.language === 'en' ? this.setState({en: record.fields}) : null;
//     });

//     // this.setState({content: "new content"});
//     });
//   }

//   render() {
//     return (
//       <h1>This is a Navbar in</h1>
//     )
//   }
// }

// export default Navbar;

// function extractObject(array, lang = 'fr') {
//   // Components are called internally during the build sequence,
//   // making locale = undefined which returns an empty object and fail the build.
//   // The default params 'fr' prevents that!
//   // console.log(array, lang);
//   return array.filter(obj => obj.node.data.language === lang);
// }