import React from 'react';
// import { Link, graphql } from 'gatsby'

import Layout from '../components/layout';
import PageHeader from '../components/page_header';
import Card from '../components/card';
import Button from '../components/button';

import '../css/pages/barista.css';

import links from '../data/external-links';
import pages from '../data/internal-links';

class BaristaPage extends React.Component {
  constructor(props) {
    super(props);
  }

  prefixLocale(path) {
    return `${this.props.pageContext.prefix}${path}`;
  }
  
  render() {
    const pageContext = this.props.pageContext;
    console.log(pageContext.data.training_1_pdf[0].url);

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
        <div id="barista-page" path={pageContext.pathname} pageTitle={pages.barista.title[pageContext.locale]}>
          <div className="page-hero image-centered"
                style={{backgroundImage: `url(${pageContext.data.picture[0].url})`}}
                data-animation="fade-in" />

          <div className="mg-xxl-top-bottom">
            <PageHeader title={pageContext.data.title} subtitle={pageContext.data.subtitle} />
          </div>

          <div className="wrapper-beige">
            <div className="container">
              <div className="column-layout pd-lg">
                
                <div className="column-half column-one">
                  <div className="wrapper-text">
                    <p>{pageContext.data.description}</p>
                  </div>
                </div>
                <div className="column-half column-two">
                  <iframe height="250" src={links.barista_video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                  </iframe>
                </div>

              </div>
            </div>
          </div>

          <br/>
          <br/>

          <div className="page-section">
            <div className="text-center">
              <h3>{pageContext.data.subtitle_2}</h3>
            </div>

            <div className="container pd-xxl-top pd-xxl-bottom">
              <div className="column-layout">
              
                <div className="column-half column-one">
                  <a href={pageContext.data.training_1_pdf[0].url} target="_blank" rel="noopener noreferrer">
                    <Card
                      title={pageContext.data.training_1_title}
                      subtitle={pageContext.data.training_1_subtitle}
                      path="#"
                      picture={pageContext.data.training_1_picture[0].url}
                    />
                  </a>
                </div>

                <div className="column-half column-two">
                  <a href={pageContext.data.training_2_pdf[0].url} target="_blank" rel="noopener noreferrer">
                    <Card
                      title={pageContext.data.training_2_title}
                      subtitle={pageContext.data.training_2_subtitle}
                      path="#"
                      picture={pageContext.data.training_2_picture[0].url}
                    />
                  </a>
                </div>
              </div>
            </div>

            <br/>

            <div className="text-center">
              <a href={links.barista_form} target="_blank" rel="noopener noreferrer">
                <Button text={pageContext.data.button} class="button-beige" />
              </a>
            </div>

          </div>
        </div>
      </Layout>
    )
  }
}
  
export default BaristaPage;

// Two sources of data for this component:
// - props.pageContext => coming from the createPage() action in gatsby-node
// - props.data => coming from the page Query below




// export const query = graphql`
//   {
//     allAirtable(filter: {table: {eq: "navbar"}}) {
//       edges {
//         node {
//           data {
//             brand
//             caption
//             button
//             referrals
//             pictures {
//               url
//             }
//             concept
//             language
//           }
//         }
//       }
//     }
//   }
// `
