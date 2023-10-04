import { useEffect, useState } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({
   setModal, 
   animarModal, 
   setAnimarModal, 
   guardarGasto, 
   gastoEditar,
   setGastoEditar
}) => {

  const [mensaje, setMensaje] = useState('')  
 
  const [nombre, setNombre] = useState('')  
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('')  //para identificar si es edición

  //ejecutar cuando el componente este listo
  useEffect(() => {
   //verificamos que si es una edición y setamos los campos
   if(Object.keys(gastoEditar).length > 0){
         setNombre(gastoEditar.nombre)
         setCantidad(gastoEditar.cantidad)
         setCategoria(gastoEditar.categoria) 
         setId(gastoEditar.id)
         setFecha(gastoEditar.fecha)
   } 
  }, [])


  const ocultarModal = () =>{
       setAnimarModal(false)
       setGastoEditar({}) //limpiamos el objeto de edicion al momento de cerrar el modal
       //damos algo de efecto para no cerra el modal de manera tan rapida y al mismo tiempo que la animacion
       setTimeout(()=>{
        setModal(false)  
       }, 500)  
  }   

  const handleSubmit = e => {
     e.preventDefault();
     
     //si al menos uno de los elementos es un string vacio
     if([nombre, cantidad, categoria].includes('')){
           setMensaje('Todos los campos son obligatorios')

           setTimeout(() =>{
               setMensaje(''); 
           }, 3000)
           return
     }

     //guardamos usando la funcion creada en el app.jsx
     guardarGasto({nombre,cantidad,categoria, id, fecha})

  } 


  return (
    <div className='modal'>
        <div className='cerrar-modal'>
             <img
                 src={CerrarBtn}
                 alt="cerrar modal"
                 onClick={ocultarModal}
             /> 
        </div>

        {/* añadimos la clase fija formulario y la dinamica para la animacion */}
        <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
          <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>

          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

          <div className='campo'>
             <label htmlFor='nombre'>Nombre Gasto</label>
             <input
                id='nombre'
                type="text"
                placeholder='Añade el nombre del Gasto'
                value={nombre}
                onChange={ e => setNombre(e.target.value)}
             />
          </div>

          <div className='campo'>
             <label htmlFor='cantidad'>Cantidad</label>
             <input
                id='cantidad'
                type="number"
                placeholder='Añade la cantidad del Gasto. Ej. 300'
                value={cantidad}
                onChange={ e => setCantidad(Number(e.target.value))}
             />  
          </div>


          <div className='campo'>
             <label htmlFor='cantidad'>Categoría</label>
             <select
               id="categoria"
               value={categoria}
               onChange={ e => setCategoria(e.target.value)}
             >
                 <option value="">-- Seleccione --</option>
                 <option value="ahorro">-- Ahorro --</option>
                 <option value="comida">-- Comida --</option>
                 <option value="casa">-- Casa --</option>
                 <option value="gastos">-- Gastos Varios --</option>
                 <option value="ocio">-- Ocio --</option>
                 <option value="salud">-- Salud --</option>
                 <option value="suscripciones">-- Suscripciones --</option>
             </select>   
          </div>

          <input
              type="submit"
              value={gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}
          /> 
    
        </form> 

    </div>  
  )
}

export default Modal