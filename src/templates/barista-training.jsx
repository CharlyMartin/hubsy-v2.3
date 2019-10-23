// Librairies
import React from 'react'

// Components
import Layout from '../components/layout'
import PageHeader from '../components/page_header'
import Card from '../components/card'
import Button from '../components/button'
import A from '../components/a'
import Image from '../components/background_image.jsx'

// CSS
import '../css/pages/barista.css'

// Data
import links from '../data/external-links'

class BaristaPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const pageContext = this.props.pageContext

    return (
      <Layout
        prefix={pageContext.prefix}
        locale={pageContext.locale}
        title={pageContext.data.seo_title}
        description={pageContext.data.seo_description}
      >
        <div id="barista-page" path={pageContext.pathname}>
          <div
            className="page-hero image-centered"
            style={{
              backgroundImage: `url(${pageContext.data.picture[0].url})`,
            }}
            data-animation="fade-in"
          />

          <div className="mg-xxl-top-bottom">
            <PageHeader
              title={pageContext.data.title}
              subtitle={pageContext.data.subtitle}
            />
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
                  <Image
                    url={pageContext.data.picture_2[0].url}
                    classList="concept-image"
                    style={{ minHeight: '200px' }}
                  />
                  {/* <iframe
                    height="250"
                    src={links.barista_video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe> */}
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div className="page-section">
            <div className="text-center">
              <h3>{pageContext.data.subtitle_2}</h3>
            </div>

            <div className="container pd-xxl-top pd-xxl-bottom">
              <div className="column-layout">
                <div className="column-half column-one">
                  {/* <A href={pageContext.data.training_1_pdf[0].url}> */}
                  <A href={links.barista_form}>
                    <Card
                      title={pageContext.data.training_1_title}
                      subtitle={pageContext.data.training_1_subtitle}
                      path="#"
                      picture={pageContext.data.training_1_picture[0].url}
                    />
                  </A>
                </div>

                <div className="column-half column-two">
                  {/* <A href={pageContext.data.training_2_pdf[0].url}> */}
                  <A href={links.barista_form}>
                    <Card
                      title={pageContext.data.training_2_title}
                      subtitle={pageContext.data.training_2_subtitle}
                      path="#"
                      picture={pageContext.data.training_2_picture[0].url}
                    />
                  </A>
                </div>
              </div>
            </div>

            <br />

            <div className="text-center">
              <A href={links.barista_form}>
                <Button text={pageContext.data.button} class="button-beige" />
              </A>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BaristaPage

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
