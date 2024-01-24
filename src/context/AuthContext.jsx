import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect} from 'react'
import { BASE_URL } from '../config.jsx'
import axios from 'axios';
import { Encriptar, Desencriptar} from '../components/EncryptRsa.jsx';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  
  const login = (cedula, contrasena) => {

    const data = {
      cedula, 
      contrasena
    }
    setIsLoading(true);
    
    axios.post(`${BASE_URL}/auth`, {
      
      data: Encriptar(data) //datos encriptados enviados por metodo POST 
    })
    .then(response => {
      const userInfo = Desencriptar(response.data.data); //data usuario encriptado para desencriptar
      if (userInfo.status ==='success') {
        
        const userToken = Desencriptar(response.data.token); //token encriptado para desencriptar

        console.log(`
        informacion recibida de la peticion al sistema:
        token: ${userToken}
        exp: ${userInfo.exp}
        status: ${userInfo.status}
        cedula: ${userInfo.cedula}
        nombre: ${userInfo.nombre}
        correo: ${userInfo.correo}
        rol: ${userInfo.rol}`);

        setUserInfo(userInfo); //se asigna a estado 
        setUserToken(userToken); //token se pasa a estado
  
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));//se guarda en localstorage
        AsyncStorage.setItem('userToken', userToken); //se guarda en localstorage
        setIsLoading(false);
      } else {

        console.log(`
        informacion recibida de la peticion al sistema:
        error: ${userInfo.error}
        status: ${userInfo.status}`);
        
        setIsLoading(false);
        alert(userInfo.error);
      }
     
    })
    .catch((error) => {
      
      console.log(`error al iniciar sesion error: ${error}`);
      setIsLoading(false);
    })
  }
  const logout = async () => {
  try {
    setIsLoading(true);
    await AsyncStorage.removeItem('userInfo');
    await AsyncStorage.removeItem('userToken');
    setUserToken(null);
  } catch (error) {
    console.log(`Error al cerrar sesión: ${error}`);
  } finally {
    setIsLoading(false);
  }
}

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      userInfo = JSON.parse(userInfo);

      if (userInfo && userToken) {
        // Verificar la fecha de expiración del token
        const expDate = new Date(userInfo.exp * 1000).toLocaleString();
        const time = new Date().toLocaleString();
        if (expDate > time) {
          
          setUserInfo(userInfo);
          setUserToken(userToken);
        } else {
          // Si el token ha expirado, cerrar sesión
          await logout();
        }
      }
      setIsLoading(false);

    } catch (error) {
      console.log(`isLogged in error ${error}`);
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{login, logout, isLoading, userToken, userInfo}}>
        {children}
    </AuthContext.Provider>
  )
}
