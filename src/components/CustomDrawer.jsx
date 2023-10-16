import { View, TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import {
    Avatar,
    Title,
    Caption,
    Text
} from 'react-native-paper';
import { AuthContext } from '../context/AuthContext.jsx';

import { Ionicons } from '@expo/vector-icons';

const CustomDrawer = (props) => {
    const {logout} = useContext(AuthContext);
    const {userInfo} = useContext(AuthContext);
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props} >
                <View style={{paddingLeft: 20,marginBottom:20}}>
                    <View style={{flexDirection:'row',marginTop: 15}}>
                        <Avatar.Image 
                            source={require('../../assets/img/profile.png')}
                            size={60}
                        />
                        <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={{ fontSize: 16, marginTop: 3, fontWeight: 'bold' }}>
                                {userInfo.nombre}
                            </Title>
                            <Caption style={{ fontSize: 14, lineHeight: 14 }}>
                                C.I.: {userInfo.cedula}
                            </Caption>
                        </View>
                    </View>
                </View>
                <View>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
                <TouchableOpacity onPress={() => logout()} style={{paddingVertical: 10}}>
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