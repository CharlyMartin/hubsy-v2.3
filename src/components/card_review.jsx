import React from 'react';
import star from '../images/icons/star.png';
// import { Link } from 'gatsby';

import '../css/components/review.css'

const CardReview = (props) => {
  return (
    <div className="review">
      {props.first}
      {props.content}
    </div>
  );
};

export default CardReview;