import { React, useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import './login.css';
import { loginService } from "../../services/login.service";
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const { setAuth } = useContext(AuthContext);
    const navigate=useNavigate();

    const [login, setLogin] = useState({
        username:"",
        password:"",
        remember:false
    });

    const handleInputChange=({target})=>{

        setLogin({
            ...login, //Desempaqueta el estado y copia su contenido
            [target.name]:target.value // Asigna valor al targuet en el estado, uan sola sentenvia sirve para todos ya que depende del name del target
        })
      
    }
    const handleCheckChange=({target})=>{
        setLogin({
            ...login, //Desempaqueta el estado y copia su contenido
            [target.name]:!login.remember // Asigna valor al targuet en el estado, uan sola sentenvia sirve para todos ya que depende del name del target
        })     
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        loginService.login(login.username,login.password,login.remember).then(respuesta=>{
            if(respuesta.ok){
                setAuth({login:true,access:respuesta.token.access,refresh:respuesta.token.refresh})
                return navigate('/');
            }
        });



    }


    return (
        <main className="form-signin text-center">
            <form onSubmit={handleSubmit}>

                    
                    <h1 className="h3 mb-3 fw-normal">Login</h1>

                    <div className="form-floating">
                        <input 
                            type="text"
                            name='username'
                            className="form-control" 
                            id="floatingInput" 
                            placeholder="name@example.com"
                            value={login.username}
                            onChange={handleInputChange}
                            />
                        <label htmlFor="floatingInput">Usuario</label>
                    </div>
                    <div className="form-floating">
                        <input 
                            type="password"
                            name='password'
                            className="form-control" 
                            id="floatingPassword" 
                            placeholder="Password"
                            value={login.password}
                            onChange={handleInputChange}
                            />
                            <label htmlFor="floatingPassword">Contraseña</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input 
                                type="checkbox"
                                name='remember'
                                value="remember-me" 
                                className='text-start'
                                checked={login.remember}
                                onChange={handleCheckChange}
                                /> Recordar
                        </label>
                    </div>

                    <button 
                        className="w-100 btn btn-lg btn-primary"
                        type='submit'
                        
                        >Ingresar</button>
           
            </form>
        </main>
    );
};
