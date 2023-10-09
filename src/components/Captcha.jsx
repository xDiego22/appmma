import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Recaptcha from 'react-native-recaptcha-that-works';

const siteKey = '6LcEU7wnAAAAAB43ll7nNTrzfjg-LNjk_0QNgRmi';
const baseUrl = 'https://mmalara.000webhostapp.com/';

const Captcha = () => {
  const recaptcha = useRef();
  const [verificationResult, setVerificationResult] = useState(null);
  const [captchaRealizado, setCaptchaRealizado] = useState('unchecked'); // Estado para el checkbox

  const send = () => {
    console.log('send!');
    recaptcha.current.open();
  };

  const onVerify = (token) => {
    console.log('success!', token);
    setVerificationResult(true); // Establece el resultado de verificación como exitoso
    setCaptchaRealizado('checked'); // Marca el captcha como completado
  };

  const onExpire = () => {
    console.warn('expired!');
    setVerificationResult(false); // Establece el resultado de verificación como fracaso
  };

  return (
    <View>
      <Recaptcha
        ref={recaptcha}
        siteKey={siteKey}
        baseUrl={baseUrl}
        onVerify={onVerify}
        onExpire={onExpire}
        size="normal"
      />
      <TouchableOpacity style={styles.button} onPress={send}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>reCaptcha</Text>
          <Image
            source={require('../../assets/img/recaptcha.png')}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
      {/* Agrega el CheckBox */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          color="#54BD51"
          status={captchaRealizado}
          onStatusChange={() => setCaptchaRealizado('checked')}
        />
        <Text>¿reCaptcha realizado?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centra vertical y horizontalmente
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Captcha;
