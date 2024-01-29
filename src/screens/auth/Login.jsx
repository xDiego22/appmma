import React, {useContext, useState} from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather'; 
import InputField from '../../components/InputField.jsx';
import {AuthContext} from '../../context/AuthContext.jsx';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const Login = ({ navigation }) => {

    const [cedula, setCedula] = useState(null);
    const [password, setPassword] = useState(null);
    const [isCedulaValid, setIsCedulaValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const { login } = useContext(AuthContext);
    
    const cedulaRegex = /^[0-9]{7,8}$/;
    const passwordRegex = /^[A-Za-z0-9ñÑ_.@$!%*?&#\/\b-]{6,70}$/;
    
    const handleCedulaChange = (text) => {
        setCedula(text);
        setIsCedulaValid(cedulaRegex.test(text));
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        setIsPasswordValid(passwordRegex.test(text));
    };

    const handleLogin = () => {
        if (isCedulaValid && isPasswordValid) {
            login(cedula, password);
        } else {
            alert('Por favor, verifica los campos de entrada.');
        }
    };

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View style={{paddingHorizontal: 20}}>
            
                <Text
                    style={{
                    textAlign:'center',
                    fontSize: 30,
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: 70,
                    }}>
                    Bienvenido! <MaterialCommunityIcons name="hand-wave-outline" size={28} color="black" />
                </Text>

                <InputField
                    label={'Cedula'}
                    icon={
                    <Feather
                    name="user"
                    size={25}
                    color="#666"
                    style={{marginRight: 5}}
                    />
                    }
                    keyboardType='numeric'
                    value={cedula}
                    maxLength={8}
                    onChangeText = {handleCedulaChange}
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
                    value={password}
                    maxLength={25}
                    onChangeText = {handlePasswordChange}
                />

                {!isCedulaValid && (
                    <Text style={{ color: 'red' }}>Cedula no válida</Text>
                )}
                {!isPasswordValid && (
                    <Text style={{ color: 'red' }}>Contraseña no válida</Text>
                )}
            
                <TouchableOpacity
                    onPress={handleLogin}
                    style={{
                        backgroundColor: '#FF5C5C',
                        padding: 20,
                        borderRadius: 10,
                        marginBottom: 30,
                        marginTop: 40
                    }}>
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