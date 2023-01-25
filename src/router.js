import { createBrowserRouter } from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Admin from './pages/admin';
import Create from './pages/create';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: 'register',
        element: <Register />
    },
    {
        path: 'dashboard',
        element: <Dashboard />
    },
    {
        path: 'admin',
        element: <Admin />
    },
    {
        path: 'create',
        element: <Create />
    }
]);

export default router;
