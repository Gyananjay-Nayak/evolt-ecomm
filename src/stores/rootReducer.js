import { combineReducers } from 'redux';
import Products from './products/productReducer';

const rootReducer = combineReducers({ Products });
export default rootReducer;
