import React from 'react';
import '../css/components/disclaimer.css'
// import { prependOnceListener } from 'cluster';

const Disclaimer = (props) => {
  return (
    <div className="disclaimer">
      <p>{props.text}</p>
      {props.children}
    </div>
  );
};

export default Disclaimer;