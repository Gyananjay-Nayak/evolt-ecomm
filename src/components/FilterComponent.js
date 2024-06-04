import React, { useState } from 'react';
// import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MultiRangeSlider from 'multi-range-slider-react';
import '../assets/css/dualRangeSlider.css';

const FilterComponent = ({ categories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    console.log('hhhj');
    onFilterChange({ category, minValue, maxValue });
  };

  const handlePriceChange = ({ minValue, maxValue }) => {
    setMinValue(minValue);
    setMaxValue(maxValue);
    console.log('hhh', maxValue);
    onFilterChange({ category: selectedCategory, minValue, maxValue });
  };

  const handleClearAll = () => {
    setSelectedCategory('');
    setMinValue(0);
    setMaxValue(1000);
    onFilterChange({ category: '', minValue: 0, maxValue: 1000 });
  };

  return (
    <div className="filter-component my-4">
      <h5 className="filter-header mt-2 mb-4">Filters</h5>
      <div className="category-filter mb-3">
        <div className="filter-title pb-3">Filter By Category</div>
        {categories.map((category, index) => (
          <div className="form-check" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              name="category"
              id={`category-${index}`}
              value={category}
              checked={selectedCategory == category}
              onChange={handleCategoryChange}
            />
            <label className="form-check-label" htmlFor={`category-${index}`}>
              {category}
            </label>
          </div>
        ))}
      </div>

      <div className="price-filter mb-3">
        <div className="filter-title">Filter By Price</div>
        <MultiRangeSlider
          min={0}
          max={1000}
          step={5}
          minValue={minValue}
          maxValue={maxValue}
          onChange={handlePriceChange}
          style={{ border: 'none', boxShadow: 'none' }}
          label="false"
          ruler="false"
          barInnerColor="darkGray"
        />
        <div className="d-flex justify-content-between">
          <span>{minValue}</span>
          <span>{maxValue}</span>
        </div>
      </div>

      <button className="btn btn-secondary btn-sm" onClick={handleClearAll}>
        Clear All
      </button>
    </div>
  );
};

FilterComponent.propTypes = {
  categories: PropTypes.array,
  onFilterChange: PropTypes.func
};

export default FilterComponent;
