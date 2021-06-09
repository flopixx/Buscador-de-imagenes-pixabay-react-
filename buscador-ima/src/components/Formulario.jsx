import React,{useState} from 'react';
import Error from './Error'; // importo el component del error donde lo voy a usar

const Formulario = ({guardarBus}) => {
    // poner el el estado lo que el usuario escribe en el input 
    const [termino,guardarTer]=useState("") // inicia vacio
    const [ error, guardarError] = useState(false) // el estado del error comienza en falso si cuando valido es true muestra el componente del error

    const buscarIma = e =>{
        e.preventDefault()

         // primero valido 

         if ( termino.trim() === ""){
             guardarError (true)
             return;
         }
         // caso contrario eliminar el error previo
         guardarError(false)
         guardarBus(termino)

    }
    return (
       <form
        onSubmit={buscarIma} // cuando el usuario da submit busca imagenes
        > 
          
           <div className="row">
               <div className="form-group col-md-8">
                   <input type="text" 
                   className="form-control form-control-lg"
                   placeholder="Busca una imagen ejemplo : futbol"
                   onChange={e=>guardarTer(e.target.value)}

                   />

               </div>
               <div className="form-group col-md-4">
               <input type="submit" 
                   className="btn btn-lg btn-danger"
                   value="Buscar"

                   />
               
                   </div>
           </div>
           { error ? <Error mensaje="Agrega un termino de busqueda" /> : null }  
        
       </form>
    )
}

export default Formulario;
