import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

// import Navegacion from './src/components/Navegacion.jsx';
// import Login from './src/views/Login.jsx';
import AuthNavigator from './src/navigation/AuthNavigator.jsx';


export default function App() {
  return (
    <>
      <NavigationContainer>

        <AuthNavigator/>
      </NavigationContainer>
      {/* <Navegacion/> */}
    </>
  ); 
}
