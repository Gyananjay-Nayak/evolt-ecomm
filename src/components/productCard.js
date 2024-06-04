import React from 'react';
import PropTypes from 'prop-types';
import { StarRating } from './rating';

const ProductCard = ({ product }) => {
  return (
    <div className="container my-4 product-card">
      <div className="card border-0 rounded-0 shadow product-card">
        <div className="product-img-container">
          <img src={product.image} className="card-img-top product-image" alt={product.title} />
        </div>
        <div className="card-body mt-3 mb-3">
          <div className="row">
            <div className="col-12">
              <div className="card-text">
                <div className="d-flex align-items-center">
                  <StarRating value={product.rating.rate} />{' '}
                  <div className="ml-2"> Review ({product.rating.count}) </div>
                </div>
              </div>
              <h5 className="card-title">{product.title}</h5>
              <p className="mb-0">
                ₹ {product.price}
                {Number.isInteger(product.price) ? '.00' : ''}
              </p>
            </div>
            {/* <div className="col-2">
          <i className="bi bi-bookmark-plus fs-2"></i>
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number
    })
  }).isRequired
};

export default ProductCard;
