import Products from '../pages/products';
import ProductDetails from '../pages/productDetails';

const Routes = [
  {
    path: '/',
    component: <Products />
  },
  {
    path: '/products/:id',
    component: <ProductDetails />
  }
];

export default Routes;
