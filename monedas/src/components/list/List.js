import { React, useContext, useEffect,useState } from 'react'
import { monedasService } from '../../services/monedas.service';
import { AuthContext } from '../login/AuthContext';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useNavigate } from "react-router-dom";
import { URL_SERVICIO } from '../../config/config';

export const List = () => {
  const { auth } = useContext(AuthContext);
  const [rowData,setRowData] = useState([]);
  const [columnDefs] = useState([
    { field: "id", headerName:'ID' },
    { field: "fecha_conversion",headerName:'Fecha de conversión' },
    { field: "fecha_operacion",headerName:'Fecha de operación' },
    { field: "monto_uf",headerName:'Monto en UF' },
    { field: "monto_clp",headerName:'Resultado en CLP' },
    { field: "tasa",headerName:'Tasa' },
]); 
  

  useEffect(() => {
    monedasService.getList(auth.access).then(respuesta=>{

      if(respuesta.ok){
         setRowData(respuesta.monedas.results);
      }
      else {
        if(respuesta.code===403){
          return navigate('/unautorized');
        }
      }
      console.log(respuesta);
    });


  }, []);
  const navigate=useNavigate();

  
  return (
    <>
    <h2>Lista de Operaciones de Conversion</h2>
    <hr/>
    <button type="button" class="btn btn-link"> <a href={`${URL_SERVICIO}/prueba-app/download/`}>Exportar a excel</a> </button> 
    <hr/>
    <div className="ag-theme-alpine" style={{height: 450, width: 1000}}>
           <AgGridReact
               rowData={rowData}
               columnDefs={columnDefs}>
           </AgGridReact>
    </div>
                 </>

  )
}
