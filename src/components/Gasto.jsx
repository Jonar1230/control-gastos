import React from 'react'
import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"
import { formatearFecha } from '../helpers';

import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'


//accedemos de forma dinamica a la imagen 
const diccionarioIconos = {
   ahorro: IconoAhorro,
   comida: IconoComida,
   casa: IconoCasa,
   gastos: IconoGastos,
   ocio: IconoOcio,
   salud: IconoSalud,
   suscripciones: IconoSuscripciones
}
 

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {

  const {categoria, nombre, cantidad, id, fecha} = gasto;

  //funciones necesarios para dar el efecto swipe (parte delantera y parte trasera del elemento)
  const leadingActions = () => (
     <LeadingActions>
          <SwipeAction onClick={() => setGastoEditar(gasto)}>
               Editar
          </SwipeAction>
     </LeadingActions>
  )
  const trailingActions = () => (
     <TrailingActions>
          <SwipeAction 
            onClick={() => eliminarGasto(id)}
            destructive={true}
          > 
              Eliminar
          </SwipeAction> 
     </TrailingActions> 
  )   

  return (
  
    <SwipeableList>
       <SwipeableListItem
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
       >
          <div className="gasto sombra">
               <div className='contenido-gasto'>

                    <img
                         src={diccionarioIconos[categoria]} 
                         alt="Icono Gasto"
                    /> 


                    <div className='descripcion-gasto'>

                         <p className='categoria'>
                              {categoria}
                         </p>  
                         <p className='nombre-gasto'>
                              {nombre}
                         </p>
                         <p className='fecha-gasto'>
                              Agregado el: {''}
                              <span></span>
                              {formatearFecha(fecha)}
                         </p>   

                    </div>

               </div> 

               <p className='cantidad-gasto'>${cantidad}</p>
          </div>
       </SwipeableListItem>
     </SwipeableList>

  )
}

export default Gasto