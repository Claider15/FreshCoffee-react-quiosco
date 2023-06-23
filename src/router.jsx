import {createBrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout'
import AuthLayout from './layouts/AuthLayout'
import Inicio from './views/Inicio'
import Login from './views/Login'
import Registro from './views/Registro'
import AdminLayout from './layouts/AdminLayout'
import Ordenes from './views/Ordenes'
import Productos from './views/Productos'

const router = createBrowserRouter([
    {
        path: '/', // / es la pág. principal. Cuando visite esa página, vamos a colocarle un element (componente de React que quieroque cargue cuando el usuario visite esa página)
        element: <Layout />, // componente cargado en la URL "/" 
        children: [
            {
                index: true,
                element: <Inicio />
            }
        ]
    },
    {
        path:'/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/registro',
                element: <Registro />
            }
        ]
    },
    {
        path:'/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Ordenes />
            },
            {
                path: '/admin/productos',
                element: <Productos />
            }
        ]
    }
])

export default router  // para poder exportarlo e importarlo en el archivo principal (main.jsx)