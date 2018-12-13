import React from 'react';
import star from '../images/icons/star.png';
import Image from './image';
// import { Link } from 'gatsby';

import '../css/components/review.css'

const Review = (props) => {
  return (
    <div className="review pd-lg">
      <div className="review-padding">
        
        <div className="review-top">
          <div className="review-owner">
            <p className="text-small">{props.first}</p>
          </div>
          <div className="review-stars">
            <Image src={star} />
            <Image src={star} />
            <Image src={star} />
            <Image src={star} />
            <Image src={star} />
          </div>
        </div>


        <div className="review-bottom">
          <p>{props.content}</p>
        </div>

      </div>
    </div>
  );
};

export default Review;