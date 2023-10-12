import React, { useContext } from 'react'
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper'
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator.jsx";
import DrawerNavigator from './DrawerNavigator.jsx'
import { AuthContext } from '../context/AuthContext.jsx';

const AppNav = () => {

  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={'large'} animating={true} color={ 'blue' } /> 
      </View>
    )
  }
  return (
  
    <NavigationContainer>

      {userToken !== null ? <DrawerNavigator/> : <AuthNavigator />}
        
    </NavigationContainer>
  )
}

export default AppNav