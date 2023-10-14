import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect} from 'react'
import { BASE_URL } from '../config.jsx'
import axios from 'axios';
// import { Encriptar, Desencriptar} from '../components/EncryptRsa.jsx';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  
  const login = (cedula, contrasena) => {

    // const data = {
    //   cedula, 
    //   contrasena
    // }
    // const dataEncriptado = Encriptar(data);
    // const dataDesEncriptado = Desencriptar(dataEncriptado);

    setIsLoading(true);
    axios.post(`${BASE_URL}/auth`, {
      
      cedula, 
      contrasena
      // data: dataEncriptado
    })
    .then(response => {
      let userInfo = response.data;
      setUserInfo(userInfo);
      setUserToken(userInfo.data.token);

      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      AsyncStorage.setItem('userToken', userInfo.data.token);

      // console.log(userInfo);
      // console.log(`informacion de usuario ${userInfo.data.token}`);
    })
    .catch((error) => {
      console.log(`error al iniciar sesion ${error}`);
    })
    // setUserToken('ioioii');//token JWT
    // AsyncStorage.setItem('userToken','ioioii');
    setIsLoading(false);
  }
  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
        setUserToken(userToken);
        
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
