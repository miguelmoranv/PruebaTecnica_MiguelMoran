import React,{useState, useEffect} from "react";


//Componentes
import {IonApp} from '@ionic/react';
import { setupIonicReact } from "@ionic/react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";



//Css
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './App.css'

import Register from "./views/Register";
import Login from "./views/Login";
import { UserProvider } from "./context/UserContext";
import Catalogo from "./views/Catalogo";
import { CartProvider } from "./context/CartContext";
import Carrito from "./views/Carrito";
import Perfil from "./views/Perfil";





setupIonicReact();
function App() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(prefersDark.matches);

    prefersDark.addEventListener('change', (e) => {
      setDarkMode(e.matches);
    });

    return () => {
      prefersDark.removeEventListener('change', (e) => {
        setDarkMode(e.matches);
      });
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);


  return (
    <>
    <CartProvider>
    <UserProvider>
    <IonApp>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/Registro" element={<Register/>} />
          <Route path="/Catalogo" element={<Catalogo/>} />
          <Route path="/Carrito" element={<Carrito/>} />
          <Route path="/Perfil" element={<Perfil/>} />
        </Routes>
      </Router>
    </IonApp>
    
    </UserProvider>
    </CartProvider>
    </>
  );
}

export default App;
