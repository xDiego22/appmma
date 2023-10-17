import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home.jsx';
import historial from '../screens/historial.jsx';
import ReporteEvento from '../screens/Reporteevento.jsx';
import ReporteAtleta from '../screens/reporteatleta.jsx';
import ReporteResultado from '../screens/ReporteResultado.jsx';
import CustomDrawer from '../components/CustomDrawer.jsx'
import {MaterialIcons} from '@expo/vector-icons/';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const Drawer = createDrawerNavigator();
const HomeIcon =({focused,color, size})=><MaterialIcons name="home" size={size} color={color} />
const historialIcon = ({focused,color, size }) => <MaterialIcons name="history" size={24} color="black" />
const ReporteeIcon =({focused,color, size})=><MaterialIcons name="event" size={24} color="black" />
const ReporteaIcon =({focused,color, size})=><MaterialCommunityIcons name="karate" size={24} color="black" />
const ReporterIcon =({focused,color, size})=><Foundation name="results" size={24} color="black" />


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
                    component={historial}
                    options={{
                        drawerIcon: historialIcon,
                        title:'Historial Atletas'
                    }}
                />
                <Drawer.Screen 
                    name="ReporteeveDrawer"
                    component={ReporteEvento}
                    options={{
                        drawerIcon: ReporteeIcon,
                        title: 'Reportes Eventos'
                    }} 
                />

                <Drawer.Screen 
                    name="Reporte1Drawer"
                    component={ReporteAtleta}
                    options={{
                        drawerIcon: ReporteaIcon,
                        title: 'Reportes Atletas'
                    }} 
                />

                <Drawer.Screen 
                    name="ReporteresDrawer"
                    component={ReporteResultado}
                    options={{
                        drawerIcon: ReporterIcon,
                        title: 'Reportes Resultados'
                    }} 
                />

            </Drawer.Navigator>
        </>


    );
};

export default DrawerNavigator;