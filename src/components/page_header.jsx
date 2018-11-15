import React from 'react';

import '../css/components/button.css'

const PageHeader = (props) => {
  return (
    <div className="page-header pd-xxl-bottom">
      <h1>{props.title}</h1>
      <h3>{props.subtitle}</h3>
    </div>
  );
};

export default PageHeader;

