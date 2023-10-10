import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Captcha from '../../components/Captcha.jsx';
import { useState } from 'react';

const InputField = ({ label, icon, inputType, maxLength, value, onChangeText }) => {
    return (
        <View>
            <Text>{label}</Text>
            <View style={styles.inputContainer}>
                {icon && (
                    <Feather name={icon} size={25} color="#666" style={styles.icon} />
                )}
                <TextInput
                    style={styles.input}
                    placeholder={label}
                    secureTextEntry={inputType === 'password'}
                    maxLength={maxLength}
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
        </View>
    );
}

const Login = ({ navigation }) => {
    const [usuario, setUsuario] = useState(''); // Estado para el nombre de usuario
    const [contrasena, setContrasena] = useState(''); // Estado para la contraseña
    const [camposCompletos, setCamposCompletos] = useState(false);

    const handleLogin = () => {
        if (usuario === 'usuario' && contrasena === 'contraseña') {
            // Acceso permitido
            navigation.navigate('DrawerNavigator');
        } else {
            // Acceso denegado
            alert('Credenciales incorrectas');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ paddingHorizontal: 20 }}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 70,
                    }}>
                    Bienvenido!
                </Text>

                <InputField
                    label={'Nombre de usuario'}
                    icon={'user'}
                    maxLength={10}
                    value={usuario}
                    onChangeText={(text) => {
                        setUsuario(text);
                        setCamposCompletos(text !== '' && contrasena !== '');
                    }}
                />

                <InputField
                    label={'Contraseña'}
                    icon={'lock'}
                    inputType="password"
                    maxLength={15}
                    value={contrasena}
                    onChangeText={(text) => {
                        setContrasena(text);
                        setCamposCompletos(usuario !== '' && text !== '');
                    }}
                />

                <View>
                    <Captcha />
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#666',
        marginBottom: 20,
    },
    icon: {
        marginRight: 5,
    },
    input: {
        flex: 1,
        padding: 10,
        color: '#666',
    },
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
