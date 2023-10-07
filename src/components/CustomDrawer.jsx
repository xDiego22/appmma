import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

import { Ionicons } from '@expo/vector-icons';

const CustomDrawer = (props) => {
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props} >
                <View>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Login')} style={{paddingVertical: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons name="log-out-outline" size={24} color="black" />
                        <Text
                        style={{
                            fontSize: 15,
                            marginLeft: 5,
                        }}>
                        Cerrar Sesión
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default CustomDrawer;