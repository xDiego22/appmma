import React, { useContext } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator.jsx";
import DrawerNavigator from './DrawerNavigator.jsx'
import { AuthContext } from '../context/AuthContext.jsx';
import ChargeIndicator from '../components/ChargeIndicator.jsx';

const AppNav = () => {

  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <ChargeIndicator/>
    )
  }
  return (
  
    <NavigationContainer>

      {userToken !== null ? <DrawerNavigator/> : <AuthNavigator />}
        
    </NavigationContainer>
  )
}

export default AppNav