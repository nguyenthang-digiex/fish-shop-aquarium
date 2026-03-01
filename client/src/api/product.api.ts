import axios from 'axios';
import { Product } from '../types/product';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getProducts = async (): Promise<Product[]> => {
  const res = await API.get('/products');
  return res.data.data;
};

export const getProductDetail = async (slug: string): Promise<Product> => {
  const res = await API.get(`/products/${slug}`);
  return res.data;
};
