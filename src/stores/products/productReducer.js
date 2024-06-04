import PRODUCT_CONST from './productConst';

const initialState = {
  error: '',
  loading: false
};
const Products = (state, action) => {
  if (typeof state === 'undefined') {
    state = initialState;
  }
  switch (action.type) {
    case PRODUCT_CONST.PRODUCT_LIST_REQUEST:
      state = {
        ...state,
        loading: true,
        productList: null,
        error: ''
      };
      break;
    case PRODUCT_CONST.PRODUCT_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        productList: action.payload.statusCode === 200 ? action.payload.data : false,
        error: ''
      };
      break;
    case PRODUCT_CONST.PRODUCT_LIST_ERROR:
      state = {
        ...state,
        loading: false,
        productList: null,
        error: action.payload.data ? action.payload.data.errorDescription : ''
      };
      break;
    case PRODUCT_CONST.GET_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
        productDetails: null,
        error: ''
      };
      break;
    case PRODUCT_CONST.GET_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        productDetails: action.payload.statusCode === 200 ? action.payload.data : false,
        error: ''
      };
      break;
    case PRODUCT_CONST.GET_PRODUCT_ERROR:
      state = {
        ...state,
        loading: false,
        productDetails: null,
        error: action.payload.data ? action.payload.data.errorDescription : ''
      };
      break;
    case PRODUCT_CONST.GET_CATEGORIES_REQUEST:
      state = {
        ...state,
        categoryLoading: true,
        categories: null,
        error: ''
      };
      break;
    case PRODUCT_CONST.GET_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categoryLoading: false,
        categories: action.payload.statusCode === 200 ? action.payload.data : false,
        error: ''
      };
      break;
    case PRODUCT_CONST.GET_CATEGORIES_ERROR:
      state = {
        ...state,
        categoryLoading: false,
        categories: null,
        error: action.payload.data ? action.payload.data.errorDescription : ''
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Products;
