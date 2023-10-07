import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Inscripcion = () => {
    return (
        <View style={styles.container}>
            <Text>Bienvenido a Incripcion</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    }
})

export default Inscripcion;