import React, { useContext } from 'react';

import { conversionReducer } from '../reducers/conversionReducer';
import { useReducer, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import { monedasService } from '../../services/monedas.service';
import { AuthContext } from '../login/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
registerLocale('es', es)



export const Home = () => {

  const [montoUF, setMontoUF] = useState(0)
  const [tasa, setTasa] = useState(null)
  const [montoCLP, setMontoCLP] = useState(0)
  const [startDate, setStartDate] = useState(new Date());
  const { auth } = useContext(AuthContext);

  const handleChange=({target})=>{
       
    setMontoUF( 
      target.value
    );
    
}

const handleReset=()=>{
  setStartDate(new Date());
  setMontoUF(0);
  setMontoCLP(0);
}



const handleSubmit = (e)=>{
  e.preventDefault();
  const fecha = startDate.getDate()+'-'+(startDate.getMonth() + 1)+'-'+startDate.getFullYear()
  const fecha_inv= startDate.getFullYear()+'-'+(startDate.getMonth() + 1)+'-'+startDate.getDate()
  monedasService.getTasa(montoUF,fecha).then(respuesta=>{
    
    setMontoCLP(respuesta.monedas.montoCLP);
    setTasa(respuesta.monedas.tasaCLP);
    monedasService.postMonedas({
      monto_uf:montoUF,
      monto_clp:montoCLP,
      tasa:respuesta.monedas.tasaCLP,
      fecha_conversion:fecha_inv
  
    }, auth.access).then(respuesta=>{
      
      toast(respuesta.mensage);
    });

  });
  
  
  



  console.log(fecha)  
}


  return (
    <div className="container">
      <ToastContainer />
      <h1 className=''>Convertidor de Monedas</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-5">
            <label htmlFor="exampleInputEmail1" className="form-label"> <h3>UF</h3></label>
          </div>
          <div className="col-2">

          </div>
          <div className="col-5">
            <label htmlFor="exampleInputPassword1" className="form-label"><h3>CLP</h3></label>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
              <label htmlFor="exampleInputEmail1" className="form-label"><b>Fecha de Conversión</b></label>
              <DatePicker  onKeyDown={()=>{return false}} locale="es" className='form-control' selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-6">
            <label htmlFor="exampleInputEmail1" className="form-label">Monto en <b>UF</b></label>
            <input type="number" name="montoOrigen" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={montoUF} onChange={handleChange} />
            
          </div>

          <div className="col-6">
            <label htmlFor="exampleInputPassword1" className="form-label">Monto en <b>CLP</b></label>
            <input type="number" name="montoDestino" className="form-control" id="exampleInputPassword1" value={montoCLP} readOnly />
            <div id="emailHelp"  className="form-text">Tasa del día : {tasa} </div>
          </div>
        </div>

      

        <button type="submit" className="btn btn-primary">Convertir</button>

        <button type="reset" className="btn btn-secondary" onClick={handleReset}>Limpiar</button>

      </form>

    </div>
  );
};
