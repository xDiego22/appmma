import React from 'react'
import AppNav from './src/navigation/AppNav.jsx';
import {AuthProvider} from './src/context/AuthContext.jsx';

export default function App() {
  return (
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
  ); 
}
