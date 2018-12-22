import React from 'react';
// import { Link } from 'gatsby'
// import Button from '../components/button';
// import Layout from '../components/layout';
// import PageHeader from '../components/page_header';

class LegalPage extends React.Component {
  constructor(props) {
    super(props);
  }

  prefixLocale(path) {
    return `${this.props.pageContext.prefix}${path}`;
  }
  
  render() {
    // const pageContext = this.props.pageContext;

    return (
      // <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
      //   Hello
      // </Layout>
      <p>Hello</p>
    )
  }
}
  
export default LegalPage;