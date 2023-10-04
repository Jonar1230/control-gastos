import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generaId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {

  const [gastos, setGastos] = useState(
      //si existe accedemos al listado del local storage
       localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  ) //listado de gastos 

  //si existe el localStorage seteamos el hook
  const [presupuesto, setPresupuesto] = useState(
      Number(localStorage.getItem('presupuesto')) ?? 0
  ) 
  
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false) //vaidar cuando se muestra el modal

  const [animarModal, setAnimarModal] = useState(false) //cuando este en true se añadira la clase que proporciona la animacion

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('');  
  const [gastosFiltrados, setGastosFiltrados] = useState([]); 
  
  //useEffect utilizado para la edicion de gastos
  useEffect(() => {
    //verificamos que el objeto de gastoEditar no este vacio
    if(Object.keys(gastoEditar).length > 0){

        setModal(true)

        setTimeout(() => {
          setAnimarModal(true)
        }, 500) 

    } 
  }, [gastoEditar])


  //useEffect para definir el presupuesto en local Storage, cada vez que cambie presupuesto
  useEffect(() => {
      localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])    


  //useEffect para el filtro de tipo de gasto
  useEffect(() => {
    if(filtro){
        //console.log('filtrando...', filtro)
        //si existe el filtro, se filtra el listado de gastos a mostrar en el listado
        const gastosFiltrados = gastos.filter( (gasto) => gasto.categoria === filtro )

        setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro]) 


  //useEffect para evitar que pase por la pantalla de definir el presupuesto, si ya existe un presupuesto valido en LocalStorage  
  useEffect(() => {
     const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
     if(presupuestoLS > 0){
        setIsValidPresupuesto(true)
     }
  }, [])     


  //para almacenar los gastos en local storage
   useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
   }, [gastos]) 



  //funcion que despliega el modal. utilizado al presionar el el icono de nuevo gasto
  const handleNuevoGasto = () => {
       setModal(true)
       setGastoEditar({}) //limpiamos el objeto de edicion, para que se diferencie del proceso de agregar 

       setTimeout(() => {
          setAnimarModal(true)
       }, 500) 
  }

  //manejar el guardado del nuevo gasto. recibe un objeto como parametro
  const guardarGasto = gasto => {

    //si viene el parametro id es edicion (guardado en el componente modal)
    if(gasto.id){
      //Actualizar , buscamos el registro dentro del array, si coincide lo reemplazamos por el nuevo
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState )
      setGastos(gastosActualizados)
      setGastoEditar({}) //limpiamos el objeto de edicion, para que se diferencie del proceso de agregar 
    }else{
      //Nuevo Gasto
      gasto.id = generaId();
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }  

    setAnimarModal(false)
    //damos algo de efecto para no cerra el modal de manera tan rapida y al mismo tiempo que la animacion
    setTimeout(()=>{
     setModal(false)  
    }, 500)  
    
  }   


  const eliminarGasto = id => {
       //devolvemos solo los que sean diferentes al id recibido por parametro
       const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
       setGastos(gastosActualizados)
  }  

  return (
     <div className={modal ? 'fijar' : ''}>
       <Header
         gastos={gastos} 
         setGastos={setGastos}
         presupuesto={presupuesto}
         setPresupuesto={setPresupuesto}
         isValidPresupuesto={isValidPresupuesto}
         setIsValidPresupuesto = {setIsValidPresupuesto}
       />


       {isValidPresupuesto && (    
        <>
         <main> 
          <Filtros
             filtro={filtro}
             setFiltro={setFiltro}
          />
           <ListadoGastos
               gastos={gastos}
               setGastoEditar = {setGastoEditar}
               eliminarGasto={eliminarGasto}
               filtro={filtro}
               gastosFiltrados={gastosFiltrados}
           />
         </main>    
          <div className='nuevo-gasto'>
              <img
                  src={IconoNuevoGasto}
                  alt='Icono nuevo gasto'
                  onClick={handleNuevoGasto}
              /> 
          </div> 
        </>
       )}

       {modal && <Modal 
                setModal={setModal} 
                animarModal={animarModal} 
                setAnimarModal={setAnimarModal}
                guardarGasto={guardarGasto}
                gastoEditar={gastoEditar}
                setGastoEditar={setGastoEditar}
                />
       } 


     </div> 
  )
}

export default App
