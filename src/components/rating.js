// import { Star } from './star';

// // eslint-disable-next-line react/prop-types
// export const StarRating = ({ value }) => (
//   <div>
//     {Array.from(Array(5)).map((_, index) => {
//       const starSerialNumber = index + 1;

//       if (starSerialNumber <= Math.floor(value)) {
//         return (
//           <div key={starSerialNumber}>
//             <Star />
//           </div>
//         );
//       }

//       if (starSerialNumber > Math.ceil(value)) {
//         return (
//           <div key={starSerialNumber}>
//             <Star filling={0} />
//           </div>
//         );
//       }

//       const filling = value - index;

//       return (
//         <div key={starSerialNumber}>
//           <Star filling={filling} />
//         </div>
//       );
//     })}
//   </div>
// );

import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/rating.css';
import { Star } from './star';

export const StarRating = ({ value }) => (
  <div className="rating-container">
    {Array.from({ length: 5 }).map((_, index) => {
      const starSerialNumber = index + 1;

      if (starSerialNumber <= Math.floor(value)) {
        return (
          <div key={starSerialNumber} style={{ display: 'inline-block' }}>
            <Star />
          </div>
        );
      }

      if (starSerialNumber > Math.ceil(value)) {
        return (
          <div key={starSerialNumber} style={{ display: 'inline-block' }}>
            <Star filling={0} />
          </div>
        );
      }

      const filling = value - index;

      return (
        <div key={starSerialNumber} style={{ display: 'inline-block' }}>
          <Star filling={filling} />
        </div>
      );
    })}
  </div>
);

StarRating.propTypes = {
  value: PropTypes.number.isRequired
};
