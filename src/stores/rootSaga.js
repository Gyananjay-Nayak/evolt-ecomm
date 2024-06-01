import { all } from 'redux-saga/effects';
import ProductSaga from './products/productSaga';

export default function* rootSaga() {
  yield all([ProductSaga()]);
}
