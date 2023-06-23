import useSWR from 'swr'
import Producto from '../components/Producto'
import clienteAxios from '../config/axios'
import useQuiosco from '../hooks/useQuiosco'

export default function Inicio() {
  const {categoriaActual} = useQuiosco()

  // consulta SWR
  const token =  localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('/api/productos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(data => data.data)
  const { data, error, isLoading } = useSWR('/api/productos', fetcher, {
    refreshInterval: 1000
  })

  if(isLoading) return 'cargando..';


  const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id)

  return (
    <>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {productos.map(producto => (
          <Producto 
            key={producto.imagen}
            producto={producto}
          />
        ))}
      </div>
    </>
  )
}
