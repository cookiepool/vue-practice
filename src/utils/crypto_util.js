import CryptoJS from 'crypto-js';

// 浏览器自带的base64编解码
function base64_btoa(data) {
  return window.btoa(data);
}
function base64_atob(data) {
  return window.atob(data);
}

// 定义一个key，为了避免补位，使用16进制数形成16位字符串，以下的key仅做测试用
// 使用parse将utf8编码转换成WordArray对象
let key = CryptoJS.enc.Utf8.parse('0123456789ABCDEF');
// 定义偏移量，跟key的定义方式相同
let iv = CryptoJS.enc.Utf8.parse('FEDCAB9012345678');

// aes加密
function encrypt_aes(data) {
  // 判断一下传过来的是字符串还是对象
  let finalData;
  if(typeof data === 'string') {
    finalData = CryptoJS.enc.Utf8.parse(data);
  }else if(typeof data === 'object') {
    finalData = CryptoJS.enc.Utf8.parse(
      // 传过来是对象的话要转换成JSON字符串在转
      JSON.stringify(data)
    );
  }

  // 进行AES加密
  let encrypted = CryptoJS.AES.encrypt(finalData, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  
  return encrypted.ciphertext.toString();
}

// aes解密
function decrypt_aes(data) {
  let strData = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Hex.parse(data)
  );

  // 解密
  let decrypted = CryptoJS.AES.decrypt(strData, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  return decrypted.toString(CryptoJS.enc.Utf8).toString();
}


export default {
  base64_btoa,
  base64_atob,
  encrypt_aes,
  decrypt_aes
}