import { View, Text } from 'react-native'
import React from 'react'

import { ActivityIndicator } from 'react-native-paper'

const ChargeIndicator = () => {
  return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={'large'} animating={true} color={'blue'} />
        <Text style={{ marginTop: 14, fontSize: 18 }}>Validando credenciales...</Text>
        <Text style={{ fontSize: 14, marginTop: 10 }}>Espere un momento</Text>
      </View>
    )
}

export default ChargeIndicator