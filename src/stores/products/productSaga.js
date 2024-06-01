import { takeEvery, fork, all, call, put } from 'redux-saga/effects';
import PRODUCT_CONST from './productConst';
import { productListSuccess, productListError } from './productActions';
import axios from 'axios';

function* productList(action) {
  let url = 'https://fakestoreapi.com/products';

  try {
    const response = yield call(axios.post, url, action.payload);
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

  const productId = action?.payload;

  if (productId != null) {
    url += `/${productId}`;
  }

  try {
    const response = yield call(axios.post, url, action.payload);
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

export function* watchProductList() {
  yield takeEvery(PRODUCT_CONST.PRODUCT_LIST_REQUEST, productList);
}
export function* watchProductDetails() {
  yield takeEvery(PRODUCT_CONST.GET_PRODUCT_REQUEST, productDetails);
}

function* ProductSaga() {
  yield all([fork(watchProductList)]);
}

export default ProductSaga;
