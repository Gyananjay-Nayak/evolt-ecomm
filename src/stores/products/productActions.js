import PRODUCT_CONST from './productConst';

export const productListRequest = (data) => {
  return {
    type: PRODUCT_CONST.PRODUCT_LIST_REQUEST,
    payload: data
  };
};
export const productListSuccess = (data) => {
  return {
    type: PRODUCT_CONST.PRODUCT_LIST_SUCCESS,
    payload: data
  };
};
export const productListError = (error) => {
  return {
    type: PRODUCT_CONST.PRODUCT_LIST_ERROR,
    payload: error
  };
};

export const getproductDetailsRequest = (data) => {
  return {
    type: PRODUCT_CONST.GET_PRODUCT_REQUEST,
    payload: data
  };
};
export const getproductDetailsSuccess = (data) => {
  return {
    type: PRODUCT_CONST.GET_PRODUCT_SUCCESS,
    payload: data
  };
};
export const getproductDetailsError = (error) => {
  return {
    type: PRODUCT_CONST.GET_PRODUCT_ERROR,
    payload: error
  };
};

export const getCategoriesRequest = (data) => {
  console.log(data);
  return {
    type: PRODUCT_CONST.GET_CATEGORIES_REQUEST,
    payload: data
  };
};
export const getCategoriesSuccess = (data) => {
  return {
    type: PRODUCT_CONST.GET_CATEGORIES_SUCCESS,
    payload: data
  };
};
export const getCategoriesError = (error) => {
  return {
    type: PRODUCT_CONST.GET_CATEGORIES_ERROR,
    payload: error
  };
};
