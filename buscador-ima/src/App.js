

import React ,{useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import Listado from './components/Listado';


function App() {
  const [busqueda,guardarBus]=useState("")
  const [imagenes,guardarIma]=useState([])
  const [paginaactual,guardarActual] = useState(1)// en que pagina nos encontramos para el paginador 
  const [ totalpaginas,guardarTotal] = useState(1)

  // tenemos 30 imagenes por pagina  tengo que saber cuantos resultados hay en total  500 / 30 



  // cuando la busqueda cambie usamos useefect
  useEffect(() => {
    const consultarApi= async ()=>{
      if(busqueda === "") return // para que no haga la consulta cuando entras 
    // si esta vacio no hace la consulta
     const key = "20587791-379aa0d0b732b434e7a700502";
     const paginacionLimit = 30;
     const url = ` https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${paginacionLimit}&page=${paginaactual}  ` // esto es para la paginacion
     const respuesta = await fetch(url)
     const resultado = await respuesta.json()
     guardarIma(resultado.hits)

     // calcular total paginas 
     const calcularPagina = Math.ceil(resultado.totalHits / paginacionLimit)
     guardarTotal(calcularPagina)

     // mover pantalla hacia arriba

     const jumbotronn = document.querySelector(".jumbotron")
     jumbotronn.scrollIntoView({behavior:"smooth"}) // comportamiento 
    }
    consultarApi()

  }, [busqueda,paginaactual])

  // definir pagina anterior

  const paginaAnterior=()=>{
    const nuevaPagi = paginaactual - 1 
    if(nuevaPagi === 0) return// la pagina que estamos menos 1 
    // tengo que guardar en el state la pagina 
    guardarActual(nuevaPagi)
  }

  // definir pagina siguiente 
  const paginaSiguiente =()=>{
    const nuevaPagi = paginaactual  + 1 
    if(nuevaPagi > totalpaginas) return;//  si la pagina actual es mayor al total no avanza 
    // tengo que guardar en el state la pagina 
    guardarActual(nuevaPagi)
  }
  return (
  <div className="container">
    <div className="jumbotron">
      <p className="lead text-center">Buscador de Imagenes</p>
      <Formulario
      guardarBus={guardarBus} />
    </div>
    <div className="row">
      <Listado 
      imagenes={imagenes}
      />
      <button 
      type="button"
      className="btn btn-info mr-1"
      onClick={paginaAnterior}
      
      >&laquo;Anterior </button>
       <button 
      type="button"
      className="btn btn-info"
      onClick={paginaSiguiente}
      >Siguiente &raquo;</button>
    </div>
    </div>
  
  );
}

export default App;
