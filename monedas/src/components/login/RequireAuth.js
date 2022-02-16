import  { React, useContext } from 'react';
import { AuthContext } from "./AuthContext";
import {
    Navigate,
    useLocation,
  } from 'react-router-dom';


export const RequireAuth = ({ children }) => {

const {auth} = useContext(AuthContext);
const  location = useLocation();

if (!auth.login){

  return <Navigate to="/login" state={{ from: location }} replace />;
}
return  children;
};
