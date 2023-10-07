import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login.jsx';
import ForgotPassword from '../screens/ForgotPassword.jsx';
import Home from '../screens/Home.jsx';
import Clubes from '../screens/Clubes.jsx';
import Inscripcion from '../screens/Inscripcion.jsx';

import DrawerNavigator from './DrawerNavigator.jsx';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
            <Stack.Screen name='DrawerNavigator' component={DrawerNavigator} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;