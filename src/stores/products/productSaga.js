import { takeEvery, fork, all, call, put } from 'redux-saga/effects';
import PRODUCT_CONST from './productConst';
import {
  productListSuccess,
  productListError,
  getproductDetailsSuccess,
  getproductDetailsError,
  getCategoriesSuccess,
  getCategoriesError
} from './productActions';
import axios from 'axios';

function* productList(action) {
  let url = 'https://fakestoreapi.com/products';

  if (action.payload && action.payload.category) {
    url += `/category/${action.payload.category}`;
  }

  if (action.payload && action.payload.limit) {
    url += `/?limit=${action.payload.limit}`;
  }

  try {
    const response = yield call(axios.get, url);
    if (response && response.status === 200) {
      const responseData = {
        statusCode: 200,
        data: response.data
      };
      yield put(productListSuccess(responseData));
    } else {
      const responseData = {
        data: response.data.error
      };
      yield put(productListError(responseData));
    }
  } catch (error) {
    console.log(error);
  }
}
function* productDetails(action) {
  let url = 'https://fakestoreapi.com/products';

  const productId = action?.payload?.id;

  if (productId != null) {
    url += `/${productId}`;
  }

  try {
    const response = yield call(axios.get, url);
    if (response && response.status === 200) {
      const responseData = {
        statusCode: 200,
        data: response.data
      };
      yield put(getproductDetailsSuccess(responseData));
    } else {
      const responseData = {
        data: response.data.error
      };
      yield put(getproductDetailsError(responseData));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getCategory() {
  let url = 'https://fakestoreapi.com/products/categories';

  try {
    const response = yield call(axios.get, url);
    if (response && response.status === 200) {
      const responseData = {
        statusCode: 200,
        data: response.data
      };
      yield put(getCategoriesSuccess(responseData));
    } else {
      const responseData = {
        data: response.data.error
      };
      yield put(getCategoriesError(responseData));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchProductList() {
  yield takeEvery(PRODUCT_CONST.PRODUCT_LIST_REQUEST, productList);
}
export function* watchProductDetails() {
  yield takeEvery(PRODUCT_CONST.GET_PRODUCT_REQUEST, productDetails);
}

export function* watchGetCategory() {
  yield takeEvery(PRODUCT_CONST.GET_CATEGORIES_REQUEST, getCategory);
}

function* ProductSaga() {
  yield all([fork(watchProductList), fork(watchProductDetails), fork(watchGetCategory)]);
}

export default ProductSaga;
