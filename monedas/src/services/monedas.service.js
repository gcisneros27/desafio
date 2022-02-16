import Axios from 'axios';
import { URL_SERVICIO } from '../config/config';


export const monedasService = {
    postMonedas,
    getTasa,
    getList
  
};

function getTasa(montoUF,fecha) {
    const respuesta = Axios.get(`https://mindicador.cl/api/uf/${fecha}`)
        .then(respuesta => {
        
            if (respuesta.status===200) {
                
                const tasaCLP=respuesta.data.serie[0].valor;
                
                const montoCLP=Math.ceil(tasaCLP*montoUF);
                return { ok: true, mensage: 'ok', monedas: {
                    tasaCLP,
                    montoCLP
                } }
            }

            // return { ok: false, mensage: 'Error' }

        })
        .catch(err => {
            return { ok: false, mensage: 'Error!'/*mensage: err.response.data.mensaje*/ }
        });
    return respuesta;

}

function getList(token) {
    const config={headers: {
        'Authorization': 'Bearer ' + token
      }}
    const respuesta = Axios.get(`${URL_SERVICIO}/prueba-app/list/`,config)
        .then(respuesta => {
        
            if (respuesta.status===200) {
                
                return { ok: true, mensage: 'ok', monedas: respuesta.data }
            }
            

            // return { ok: false, mensage: 'Error' }

        })
        .catch(err => {
                return { ok: false, code:err.response.status }
           
        });
    return respuesta;

}

function postMonedas(body,token){
    const config={headers: {
        'Authorization': 'Bearer ' + token
      }}

    const respuesta =  Axios.post(`${URL_SERVICIO}/prueba-app/create/`, body,config)
        .then(respuesta => {
            // login successful if there's a user in the response
            if (respuesta) {
               console.log(respuesta);
                return {
                    ok: true, 
                    mensage : 'El registro se guardo exitosamente',
                    respuesta:  respuesta
                }
            }

            return { ok: false, mensage: 'Usuario o Clave inválida'}

        })
        .catch(err =>{
            return {ok: false, mensage : err.response.data.mensaje}
        });
    return respuesta;


}