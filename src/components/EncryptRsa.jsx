import { JSEncrypt } from "jsencrypt";
import { publicAPP } from '../keys/public.jsx';
import { privateAPP } from '../keys/private.jsx';

const rsa = new JSEncrypt();

export const Encriptar = (objeto) => {
  rsa.setPublicKey(publicAPP);

  const objectToEncrypt = JSON.stringify(objeto);

  const encrypted = rsa.encrypt(objectToEncrypt);
  return encrypted;
}
export const Desencriptar = (objeto) => {
  
  rsa.setPrivateKey(privateAPP);
  const decrypted = rsa.decrypt(objeto);
  return JSON.parse(decrypted);
}