import Products from '../pages/products';
import ProductDetails from '../pages/productDetails';

const Routes = [
  {
    path: '/products',
    component: <Products />
  },
  {
    path: '/products/:id',
    component: <ProductDetails />
  }
];

export default Routes;
