import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilledStar = () => <FontAwesomeIcon icon={['fas', 'star']} />;
const EmptyStar = () => <FontAwesomeIcon icon={['far', 'star']} />;

export const Star = ({ filling }) => {
  if (typeof filling === 'undefined' || filling === 1) {
    return (
      <div className="star-container">
        <FontAwesomeIcon className="filled-star" icon={['fas', 'star']} />
      </div>
    );
  }

  if (filling === 0) {
    return (
      <div className="star-container">
        <FontAwesomeIcon className="empty-star" icon={['far', 'star']} />
      </div>
    );
  }

  const width = filling * 100 + '%';

  return (
    <div className="star-container">
      <div className="star-fill" style={{ width }}>
        <FilledStar />
      </div>
      <div className="star-empty">
        <EmptyStar />
      </div>
    </div>
  );
};

Star.propTypes = {
  filling: PropTypes.number
};

Star.defaultProps = {
  filling: 1
};
