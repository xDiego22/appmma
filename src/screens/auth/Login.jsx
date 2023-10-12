import React, {useContext} from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather'; 
import InputField from '../../components/InputField.jsx';
import Captcha from '../../components/Captcha.jsx';
import {AuthContext} from '../../context/AuthContext.jsx';

const Login = ({ navigation }) => {
    const {login} = useContext(AuthContext);
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
                    maxLength={10}
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
                />

                <View>
                    <Captcha/>
                </View>
            
                <TouchableOpacity
                    onPress={() => login()}
                    style={{
                        backgroundColor: '#FF5C5C',
                        padding: 20,
                        borderRadius: 10,
                        marginBottom: 30,
                        marginTop: 15
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

                {/* <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                        marginTop: 20
                    }}>
                    <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgotPasswordButtonText}> Olvidé mi contraseña</Text>
                    </TouchableOpacity>
                </View> */}
            
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