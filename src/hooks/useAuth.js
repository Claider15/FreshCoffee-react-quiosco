import {useEffect} from 'react'
import useSWR from "swr";
import {useNavigate} from 'react-router-dom'
import clienteAxios from "../config/axios";

export const useAuth = ({ middleware, url }) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  const navigate = useNavigate();

  const { data: user, error, mutate } = useSWR('/api/user', () =>
    clienteAxios('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.data)
      .catch(error => {
        throw Error(error?.response?.data?.errors);
      })
  );

  const login = async ( datos, setErrores ) => {
    try {
      const { data } = await clienteAxios.post('/api/login', datos);
      localStorage.setItem('AUTH_TOKEN', data.token);
      setErrores([]);
      await mutate();
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
    }
  };

  const registro = async (datos, setErrores) => {
    // Implementation for registration logic
        try {
            const {data} = await clienteAxios.post('/api/registro', datos);
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            await mutate();
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
        }
  };

  const logout = async () => {
    // Implementation for logout logic
    try {
        await clienteAxios.post('/api/logout', null, {
            headers: {
                Authorization: `Bearer ${token}` // identifica al usuario con sanctum (para saber que usuario debe revocarle el token)
              }
        })
        localStorage.removeItem('AUTH_TOKEN')
        await mutate(undefined)
    } catch (error) {
        throw Error(error?.response?.data?.errors);
    }
  };

  useEffect(() => {
    if (middleware === "guest" && url && user) {
        navigate(url)
    }
    if (middleware === 'guest' && user && user.admin) {
      navigate('/admin')
    }
    if (middleware === 'admin' && user && !user.admin) {
      navigate('/')
    }
    if (middleware === 'auth' && error) { // significa que no hemos iniciado sesión
        navigate('/auth/login')
    }
  }, [user, error]) // al estar en un useEffect va a estar escuchando por los cambios que sucedan en user o error

  
  return {
    login,
    registro,
    logout,
    user,
    error
  };
};
