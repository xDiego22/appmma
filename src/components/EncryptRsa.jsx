import { View, Text } from 'react-native'
import React from 'react'
import RSAKey from 'react-native-rsa-expo';

// const RSAKey = require('react-native-rsa');
// const bits = 1024;
// const exponent = '10001'; // must be a string. This is hex string. decimal = 65537
const rsa = new RSAKey();
// rsa.generate(bits, exponent);
// const publicKey = rsa.getPublicString(); // return json encoded string
// const privateKey = rsa.getPrivateString(); // return json encoded

const publicKeyJson= {"n":"8513f10beb437f5cee4af780ef4c2c5d96573df0bb487d25ecded3411e127f840bd529996d09f3ec44e256cec1ab0d3b4e418bd7d28528e7c69e0826700a90567af16b1b4952e6ca891ac55e02ffd1e0e6c5624f0b78cecfc288668bbd78faf21754893e24e8126189f46e0d34f517f8ac5089d82b28221b3771ed8f9636c931","e":"10001"}

const privateKeyJson = {"n":"8513f10beb437f5cee4af780ef4c2c5d96573df0bb487d25ecded3411e127f840bd529996d09f3ec44e256cec1ab0d3b4e418bd7d28528e7c69e0826700a90567af16b1b4952e6ca891ac55e02ffd1e0e6c5624f0b78cecfc288668bbd78faf21754893e24e8126189f46e0d34f517f8ac5089d82b28221b3771ed8f9636c931","e":"10001","d":"282e593dcc0f594969f9e0b96187926dbf931ff4abd7bb51d42f8381c9deb3f9dec8c202bd559ffcdadfac6e4933a88f1b95d6ef9774f560e62b993261ea0ea25ace6e3d969dfcc2865dbe23681864e67a2773b381f3525967663809426e0ac39c82fa4769fa74831e9347e12a8c8f32b016b53208d05d22b4fbee8a407896b1","p":"ef11fc68e8d16907ad9b9f21cad2649650d80aa220301321c3a12cd1bd9408d4242472896732342417cd24c5837ae0f93dc8a61b3d5bba68864c3eebc3c4b987","q":"8e8075d67c81dc8ecf47d2da7d43aa79042da45418e3c4922f2342d74f215f6375258c322d19d0671d83786acc92415b732b8db8eb1395f925645b16ec703587","dmp1":"381c8a97bcfd599f79b9eaf1ad7f1028cfb4c55a241fe47daa42ec18165ce66d944611b3fa4aa83e486fd7cf9bfa7d4f429713959523306f5406154694de5985","dmq1":"796529fd9c77ac82e446157417fe4afd68f7d0e3eb882d6f3344e0ae373500e3e36a27329f853c2a7bd40203495ed6daa714555950b990ab7c952f9c29b3b585","coeff":"a17800e3d27612788e6f531d5bcf103befd5fce541dc566441a8b32cbe8d7e4a60968084838a4e164649595636cc17769ff245901dbb3827810a9a1f37793529"}

const publicKey = JSON.stringify(publicKeyJson); // return json encoded string
const privateKey = JSON.stringify(privateKeyJson); // return json encoded


//encript


const EncryptRsa = () => {
  rsa.setPublicString(publicKey);
  // Objeto que deseas encriptar (reemplaza 'object here' con tu objeto)
  const objectToEncrypt = { key1: 'value1', key2: 'value2' };
  const originText = JSON.stringify(objectToEncrypt);

  const encrypted = rsa.encrypt(originText);
  console.log(`Texto encriptado ${encrypted}`);

  rsa.setPrivateString(privateKey);
  const decrypted = rsa.decrypt(encrypted); // decrypted == originText
  const d = JSON.parse(decrypted); // Convertir la cadena desencriptada nuevamente en un objeto
  console.log(`Texto desencriptado ${decrypted}`);


  // console.log(publicKey);
  // console.log(privateKey)
}

export default EncryptRsa;