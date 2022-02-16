import './App.css';
import { Login } from './components/login/Login';
import { NavbarPrueba } from './components/layout/NavbarPrueba';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { AuthContext } from './components/login/AuthContext';

import { Home } from './components/home/Home';
import { RequireAuth } from './components/login/RequireAuth';
import { useState } from 'react';
import { List } from './components/list/List';
import { ExportExcel } from './components/list/ExportExcel';
import { Unautorized } from './components/layout/Unautorized';


function App() {
  const [auth, setAuth] = useState({ token: "", login: false });

  return (
    <>
      <Router>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <div className="container">
            <NavbarPrueba />
            <Routes>
              <Route
                path="/list"
                exact={true}
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              
              <Route
                path="/excel"
                exact={true}
                element={
                  <RequireAuth>
                    <ExportExcel/>
                  </RequireAuth>
                }
              />
              <Route exact={true} path="/login" element={<Login />} />
              <Route exact={true} path="/unautorized" element={<Unautorized />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />

            </Routes>
          </div>
        </AuthContext.Provider>
      </Router>
    </>
  );
}

export default App;
