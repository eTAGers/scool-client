import http from '../utils/http-common';

const fetchProducts = (data) => http.post('/product/fetch', data);

const ProductService = {
  fetchProducts,
};

export default ProductService;
