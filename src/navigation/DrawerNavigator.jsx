import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home.jsx';
import Clubes from '../screens/Clubes.jsx';
import Inscripcion from '../screens/Inscripcion.jsx';
import CustomDrawer from '../components/CustomDrawer.jsx'
import {MaterialIcons} from '@expo/vector-icons/';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const Drawer = createDrawerNavigator();
const HomeIcon =({focused,color, size})=><MaterialIcons name="home" size={size} color={color} />
const ClubesIcon = ({focused,color, size }) => <MaterialCommunityIcons name="boxing-glove" size={size} color={color} />
const InscripcionIcon =({focused,color, size})=><Foundation name="clipboard-pencil" size={size} color={color} />


const DrawerNavigator = () => {
    return (
        <>
            <StatusBar style="light" />
            <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawer {...props}/>} screenOptions={{
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

                <Drawer.Screen 
                    name="Home"
                    component={Home}
                    options={{
                        drawerIcon: HomeIcon,
                        title: 'Principal'
                    }} 
                />
                <Drawer.Screen 
                    name="ClubesDrawer"
                    component={Clubes}
                    options={{
                        drawerIcon: ClubesIcon,
                        title: 'Clubes'
                    }}
                />
                <Drawer.Screen 
                    name="IncripcionDrawer"
                    component={Inscripcion}
                    options={{
                        drawerIcon: InscripcionIcon,
                        title: 'Inscripcion'
                    }} 
                />

            </Drawer.Navigator>
        </>


    );
};

export default DrawerNavigator;