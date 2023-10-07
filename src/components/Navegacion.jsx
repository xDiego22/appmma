import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home.jsx';
import Clubes from '../screens/Clubes.jsx';
import Inscripcion from '../screens/Inscripcion.jsx';
import Login from '../screens/Login.jsx';
import {MaterialIcons} from '@expo/vector-icons/';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeIcon =({focused,color, size})=><MaterialIcons name="home" size={size} color={color} />
const ClubesIcon = ({focused,color, size }) => <MaterialCommunityIcons name="boxing-glove" size={size} color={color} />
const InscripcionIcon =({focused,color, size})=><Foundation name="clipboard-pencil" size={size} color={color} />

const LoginIcon = ({focused,color, size }) => <MaterialCommunityIcons name="login" size={size} color={color} />

const Navegacion = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        <Stack.Screen name="MMA">
          {() => (
            <Drawer.Navigator initialRouteName="Home" screenOptions={{
              headerShown: true,
              drawerActiveBackgroundColor: '#FCE9E9',//fondo de boton seleccionado
              drawerActiveTintColor: '#FF5C5C',//color de boton seleccionado
              drawerInactiveTintColor: '#434343', //color de botones inactivos
              drawerStyle: {
                backgroundColor:'#FFF',   //change bg color
                width:250    //change width of sidebar 
              },
              headerStyle: {
                backgroundColor: '#FF5C5C', //color de fondo
                height: 100, // largo del header
                
              },
              headerTintColor: '#FFF',
            }}>

              <Drawer.Screen name="Principal" component={Home} options={{ drawerIcon: HomeIcon}} />
              <Drawer.Screen name="Clubes" component={Clubes} options={{ drawerIcon: ClubesIcon }} />
              <Drawer.Screen name="Incripcion" component={Inscripcion} options={{ drawerIcon: InscripcionIcon }} />
              <Drawer.Screen name="Login" component={Login} options={{ drawerIcon: LoginIcon }} />
              

            </Drawer.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default Navegacion;