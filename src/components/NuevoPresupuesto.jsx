import {useEstate, useState} from 'react'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

  const [mensaje, setMensaje] = useState(''); 

  //funcion para administrar el presupuesto, se ejecutara en el submit del formulario
  const handlePresupuesto = (e) => {
     e.preventDefault(); 
   
     //validamos que sea un numero y no menor a cero
     if(!presupuesto || presupuesto < 0){
          setMensaje("No es un presupuesto válido"); 
          return  //detenemos la ejecucion del codigo en caso de que no sea valido
     }
     setMensaje(''); //dejamos el state en vacio
     setIsValidPresupuesto(true)


  }
     
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
         <form onSubmit={handlePresupuesto} className='formulario'>
              <div className='campo'>
                  <label>Definir Presupuesto</label>
                  <input
                    className='nuevo-presupuesto'
                    type='number'
                    placeholder='Añade tu Presupuesto'
                    value={presupuesto}
                    onChange={(e)=> setPresupuesto(Number(e.target.value))}
                  />
              </div>

              <input type="submit" value="Añadir" />

              {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
         </form> 
    </div> 
  )
}

export default NuevoPresupuesto