import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import CalculatorPage from '../pages/Calculator';
import Login from '../pages/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products/:slug', element: <ProductDetail /> },
      { path: 'calculator', element: <CalculatorPage /> },
      { path: 'login', element: <Login /> },
    ],
  },
]);
