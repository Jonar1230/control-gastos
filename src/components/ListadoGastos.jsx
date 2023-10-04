import React from 'react'
import Gasto from './Gasto'
import { generaId } from '../helpers'

const ListadoGastos = ({
  gastos, 
  setGastoEditar, 
  eliminarGasto,
  filtro,
  gastosFiltrados
}) => {
  return (
    <div className='listado-gastos contenedor'>
       

       {
        //si existe un filtro iteramos sobre el array de gastos filtrados
          filtro ? (
            <>
            <h2>{gastosFiltrados.length ? 'Gastos':'No hay Gastos Aún'}</h2> 
            { 
              gastosFiltrados.map(gasto => (
                      <Gasto
                        key={gasto.id}
                        gasto={gasto}
                        setGastoEditar={setGastoEditar}
                        eliminarGasto={eliminarGasto}
                      />
              )) 
            }
            </>
          ) : 
          (
            <>
             <h2>{gastos.length ? 'Gastos':'No hay Gastos Aún'}</h2> 
              { 
                gastos.map(gasto => (
                  <Gasto
                          key={gasto.id}
                          gasto={gasto}
                          setGastoEditar={setGastoEditar}
                          eliminarGasto={eliminarGasto}
                        />
                ))
              }
            </>
          )

       } 

    </div>
  )
}

export default ListadoGastos