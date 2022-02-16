import Axios from 'axios';
import { URL_SERVICIO } from '../config/config';

export const loginService = {
    login,
  
};


function login(user, password,remember){

    const respuesta =  Axios.post(`${URL_SERVICIO}/api/token/`, {username:user,password:password})
        .then(respuesta => {
            // login successful if there's a user in the response
            if (respuesta.data.access) {
                if (remember){
                    localStorage.setItem('user',user);
                    localStorage.setItem('password',password);
                }
                return {
                    ok: true, 
                    mensage : 'Login exitoso',
                    token:  respuesta.data
                }
            }

            return { ok: false, mensage: 'Usuario o Clave inválida'}

        })
        .catch(err =>{
            return {ok: false, mensage : err.response.data.mensaje}
        });
    return respuesta;


}

function visitas() {
    const respuesta = Axios.get(`${URL_SERVICIO}/contacto/get-visitas`, {})
        .then(respuesta => {

            // login successful if there's a user in the response
            if (respuesta.data.ok) {
                //setToken(respuesta.data)
                return { ok: true, mensage: 'ok', visitas: respuesta.data.visitas }
            }

            return { ok: false, mensage: 'Error' }

        })
        .catch(err => {
            return { ok: false, mensage: 'Error!'/*mensage: err.response.data.mensaje*/ }
        });
    return respuesta;

}