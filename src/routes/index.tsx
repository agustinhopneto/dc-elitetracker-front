import { createBrowserRouter } from 'react-router-dom';

import { Auth } from '../screens/auth';
import { Habits } from '../screens/habits';
import { Login } from '../screens/login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Habits />,
  },
  {
    path: '/entrar',
    element: <Login />,
  },
  {
    path: '/autenticacao',
    element: <Auth />,
  },
]);
