import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather'; 
import InputField from '../../components/InputField.jsx';
import Captcha from '../../components/Captcha.jsx';
import { useState } from 'react';

const Login = ({ navigation }) => {

    const [usuario, setUsuario] = useState(''); // Estado para el nombre de usuario
    const [contrasena, setContrasena] = useState(''); // Estado para la contraseña
    const [camposCompletos, setCamposCompletos] = useState(false);

    const handleLogin = () => {
        // Aquí puedes usar los valores de 'usuario' y 'contrasena' para realizar la autenticación o cualquier otra lógica que necesites.
        // Por ejemplo, puedes enviar estos datos a un servidor para verificar las credenciales del usuario.

        if (usuario === 'usuario' && contrasena === 'contraseña') {

        // Ejemplo hipotético de cómo puedes usar los valores:
        console.log('usuario', usuario);
        console.log('contraseña', contrasena);

        // Luego, puedes navegar a la siguiente pantalla
        navigation.navigate('DrawerNavigator');

    } else {
        // Muestra un mensaje de error si las credenciales son incorrectas
        console.log('Credenciales incorrectas');
        }
    };

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View style={{paddingHorizontal: 20}}>
            
                <Text
                    style={{
                    textAlign:'center',
                    fontSize: 28,
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: 70,
                    }}>
                    Bienvenido! 
                </Text>

                <InputField
                    label={'Nombre de usuario'}
                    icon={
                    <Feather
                    name="user"
                    size={25}
                    color="#666"
                    style={{marginRight: 5}}
                    />
                    }
                    maxLength={10}
                    value={usuario}
                    onChangeText={(text) => {
                        setUsuario(text);
                        // Verifica si ambos campos están completos y establece camposCompletos en verdadero o falso.
                        setCamposCompletos(text !== '' && contrasena !== '');
                    }}
                />

                <InputField
                    label={'Contraseña'}
                    icon={
                    <Feather
                    name="lock"
                    size={25}
                    color="#666"
                    style={{marginRight: 5}}
                    />
                    }
                    inputType="password"
                    maxLength={15}
                    value={contrasena}
                    onChangeText={(text) => {
                        setContrasena(text);
                        // Verifica si ambos campos están completos y establece camposCompletos en verdadero o falso.
                        setCamposCompletos(usuario !== '' && text !== '');
                    }}
                />

                <View>
                    <Captcha/>
                </View>
            
                <TouchableOpacity
                    onPress={handleLogin}
                    style={{
                        backgroundColor: camposCompletos ? '#FF5C5C' : '#999',
                        padding: 20,
                        borderRadius: 10,
                        marginBottom: 30,
                        marginTop: 15,
                    }}
                    disabled={!camposCompletos}
                    >

                    <Text
                        style={{
                            textAlign: 'center',
                            fontWeight: '700',
                            fontSize: 16,
                            color: '#fff',
                        }}>
                        Entrar
                    </Text>
                </TouchableOpacity>

                {!camposCompletos && (
                    <Text style={{ color: 'red', textAlign: 'center' }}>
                        Por favor, completa todos los campos.
                    </Text>
                )}       

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                        marginTop: 20
                    }}>
                    <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgotPasswordButtonText}> Olvidé mi contraseña</Text>
                    </TouchableOpacity>
                </View>
            
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  forgotPasswordButton: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  forgotPasswordButtonText: {
    color: '#424242',
    textDecorationLine: 'underline',
  },
});

export default Login;