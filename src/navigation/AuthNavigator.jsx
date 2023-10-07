import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/auth/Login.jsx';
import ForgotPassword from '../screens/auth/ForgotPassword.jsx';

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