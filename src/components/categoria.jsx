import React from 'react'
import useQuiosco from '../hooks/useQuiosco'

export default function categoria({categoria}) {
  const {handleClickCategoria, categoriaActual} = useQuiosco(); 
  const {icono, id, nombre} = categoria

    return (
    <div className={` ${categoriaActual.id === id ? "bg-amber-400" : "bg-white"} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
        <img 
        src={`/img/icono_${icono}.svg`}
        className='w-12' 
        alt="Imagen ícono" 
        />
        <button className='text-lg font-bold cursor-pointer truncate'
        type='button'
        onClick={() => handleClickCategoria(id)}
        >
          {nombre}
        </button>
    </div>
  )
}
