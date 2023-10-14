import RSAKey from 'react-native-rsa-expo';
// import RNFS, { RNFSManager } from 'react-native-fs'
// import forge from 'node-forge';

// creacion de las llaves
const bits = 1024; 
const exponent = '10001'; // must be a string. This is hex string. decimal = 65537
const rsa = new RSAKey();
rsa.generate(bits, exponent);
const publicKeyJson = rsa.getPublicString(); // return json encoded string
const privateKeyJson = rsa.getPrivateString(); // return json encoded

// // Inicializar RNFS
// RNFSManager();

// // Ruta para guardar las claves
// const publicKeyPath = `${RNFS.DocumentDirectoryPath}/public.pem`;
// const privateKeyPath = `${RNFS.DocumentDirectoryPath}/private.key`;

// // Convierte las claves JSON a formato PEM
// const privateKeyPem = forge.pki.privateKeyFromAsn1(forge.asn1.fromHex(privateKeyJson.n));
// // Exporta las claves en formato PEM
// const privateKeyPemText = forge.pki.privateKeyToPem(privateKeyPem);

// // Guardar la clave privada en un archivo
// RNFS.writeFile(privateKeyPath, privateKeyPemText, 'utf8')
//   .then(() => {
//     console.log('Clave privada guardada en private.key');
//   })
//   .catch((err) => {
//     console.error('Error al guardar la clave privada:', err);
//   });

// // Guardar la clave pública en un archivo
// RNFS.writeFile(publicKeyPath, publicKeyJson, 'utf8')
//   .then(() => {
//     console.log('Clave pública guardada en public.pem');
//   })
//   .catch((err) => {
//     console.error('Error al guardar la clave pública:', err);
//   });

const KeyCreation = () => {
    console.log(`Llave publica: ${publicKeyJson}`)
    console.log(`Llave privada: ${privateKeyJson}`)
}

export default KeyCreation;