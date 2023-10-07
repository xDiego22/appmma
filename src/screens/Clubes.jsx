import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Clubes = () => {
    return (
        <View style={styles.container}>
            <Text>Bienvenido a Clubes</Text>
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

export default Clubes;