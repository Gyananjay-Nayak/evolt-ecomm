import React, { useEffect, useState } from 'react';
import '../../assets/css/productDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShareAlt, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getproductDetailsRequest } from '../../stores/products/productActions';
import { StarRating } from '../../components/rating';
import { TailSpin } from 'react-loader-spinner';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const nextProps = useSelector((state) => ({
    productDetails: state.Products.productDetails,
    loading: state.Products.loading
  }));

  useEffect(() => {
    setLoading(true);
    dispatch(getproductDetailsRequest({ id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (nextProps.productDetails && !nextProps.loading) {
      setProductDetails(nextProps.productDetails);
      setLoading(false);
    }
  }, [nextProps.productDetails, nextProps.loading]);

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center p-lg-3 product-details-wrapper">
        <div className="product-details-container">
          {loading ? (
            <div className="vw-100 h-100 d-flex align-items-center justify-content-center">
              <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#888"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            productDetails && (
              <>
                <div className="product-image-section">
                  <div className="product-icons mb-1">
                    <div>
                      <FontAwesomeIcon icon={faHeart} /> 27
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faComment} /> 12
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faShareAlt} /> 14
                    </div>
                  </div>
                  <div className="prodict-image-conatiner">
                    <img
                      src={productDetails.image}
                      alt={productDetails.title}
                      className="main-image"
                    />
                  </div>
                </div>
                <div className="product-info-section">
                  <div className="product-header">
                    <div className="breadcrumbs">
                      <span>Products</span> &gt; <span>{productDetails.category}</span>
                    </div>
                    <h1 className="product-title">{productDetails.title}</h1>
                    <div className="product-reviews">
                      <StarRating value={productDetails.rating.rate} />
                      <span className="review-count">Review ({productDetails.rating.count})</span>
                      {/* <span className="review-count">({productDetails.rating.count})</span> */}
                    </div>
                  </div>
                  <div className="product-actions">
                    <div className="action-button">
                      <FontAwesomeIcon icon={faShareAlt} /> Share
                    </div>
                    <div className="action-button">
                      <FontAwesomeIcon icon={faExchangeAlt} /> Compare
                    </div>
                    <div className="action-button">
                      <FontAwesomeIcon icon={faHeart} /> Add to Wishlist
                    </div>
                  </div>
                  <hr></hr>
                  <div className="product-description">
                    <p>{productDetails.description}</p>
                  </div>
                  <hr></hr>
                  <div className="product-price">
                    <span className="current-price">
                      ₹ {productDetails.price}
                      {Number.isInteger(productDetails.price) ? '.00' : ''}
                    </span>
                    {productDetails.original_price && (
                      <span className="original-price">
                        ₹ {productDetails.original_price}
                        {Number.isInteger(productDetails.price) ? '.00' : ''}
                      </span>
                    )}
                  </div>
                  <div className="product-purchase">
                    <div className="quantity">
                      <label htmlFor="quantity">QTY</label>
                      <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" />
                    </div>
                    <button className="add-to-cart-button">Add to Cart</button>
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
