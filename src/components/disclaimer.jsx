import React from 'react';
import '../css/components/disclaimer.css'
// import { prependOnceListener } from 'cluster';

const Disclaimer = (props) => {
  console.log(props);
  return (
    <div className="disclaimer pd-md">
      <p>{props.text}</p>
      {props.children}
    </div>
  );
};

export default Disclaimer;