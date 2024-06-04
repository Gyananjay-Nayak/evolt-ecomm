import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productListRequest, getCategoriesRequest } from '../../stores/products/productActions';
import ProductCard from '../../components/productCard';
import FilterComponent from '../../components/FilterComponent';
import homeBanner from '../../assets/images/banners/home-banner.png';
import '../../assets/css/productList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minValue: 0,
    maxValue: 1000
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [sortOrder, setSortOrder] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  const nextProps = useSelector((state) => ({
    productList: state.Products.productList,
    loading: state.Products.loading,
    categories: state.Products.categories,
    categoryLoading: state.Products.categoryLoading
  }));

  useEffect(() => {
    dispatch(productListRequest());
    dispatch(getCategoriesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (nextProps.productList) {
      setProductList(nextProps.productList);
      applyFilters(nextProps.productList);
      setLoading(nextProps.loading);
    }
  }, [nextProps.productList, nextProps.loading]);

  useEffect(() => {
    if (nextProps.categories) {
      setCategoryList(nextProps.categories);
      setCategoryLoading(nextProps.categoryLoading);
    }
  }, [nextProps.categories, nextProps.categoryLoading]);

  useEffect(() => {
    applyFilters(productList);
  }, [filters, currentPage, itemsPerPage, searchQuery]);

  useEffect(() => {
    // if (filters.category) {
    const payload = {
      category: filters.category
    };
    setLoading(true);
    dispatch(productListRequest(payload));
    // }
  }, [filters.category]);

  const applyFilters = (products) => {
    let filtered = products.filter((product) => {
      return product.price > filters.minValue && product.price < filters.maxValue;
    });

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const sorted = sortProducts(filtered);
    const paginated = paginate(sorted);

    setFilteredProductList(paginated);
  };

  const sortProducts = (products) => {
    if (sortOrder === 'asc') {
      return products.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      return products.sort((a, b) => b.price - a.price);
    } else {
      return products;
    }
  };

  const paginate = (products) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(productList.length / itemsPerPage);

  const handleNavigate = (productId) => {
    navigate(`/products/${productId}`);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="banner-contaier">
        <img src={homeBanner} alt="home-banner" className="banner-img" />
        <div className="banner-text-container">
          <h3 className="product-page-title">{filters.category ? filters.category : 'Products'}</h3>
          <div className="banner-nav">
            <div>Home</div>
            <FontAwesomeIcon icon="fa-solid fa-angle-right" />
            <div>Products</div>
            {filters.category && (
              <>
                <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                <div>{filters.category}</div>
              </>
            )}
          </div>
        </div>
      </div>
      {categoryLoading ? (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
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
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
            />
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="search-icon" />
          </div>
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block">
              <FilterComponent categories={categoryList} onFilterChange={handleFilterChange} />
            </div>

            <div className="col-lg-9 col-12">
              {loading ? (
                <div className="w-100 h-100 d-flex align-items-center justify-content-center">
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
                <div>
                  <div className="pagination-container">
                    <div className="pagination">
                      {totalPages > 0 &&
                        [...Array(totalPages).keys()].map((number) => (
                          <>
                            <span
                              key={number + 1}
                              onClick={() => handlePageChange(number + 1)}
                              className={currentPage === number + 1 ? 'active' : ''}>
                              {number + 1}
                            </span>
                            /
                          </>
                        ))}
                      <div className="items-per-page">
                        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                          <option value={6}>6</option>
                          <option value={9}>9</option>
                          <option value={12}>12</option>
                        </select>
                      </div>
                    </div>
                    <div className="sort-order">
                      <select value={sortOrder} onChange={handleSortOrderChange}>
                        <option value="default">Default</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    {filteredProductList &&
                      filteredProductList.map((product) => (
                        <div className="col-lg-4 col-md-6 col-12" key={product.id}>
                          <div
                            className="product-wrapper"
                            onClick={() => handleNavigate(product.id)}>
                            <ProductCard product={product} />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
