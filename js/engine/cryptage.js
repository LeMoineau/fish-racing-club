
/**
 * Code by Jorgeblom
 * src: https://stackoverflow.com/questions/18279141/javascript-string-encryption-and-decryption 
 */

SECRET_PASSWORD_UwU = "g4l3tte5M4st3r";

/**
 * Encrypt a string by cipher method
 * @param {string} salt string to encrypt
 * @returns encrypted string
 */
const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

    return text => text.split('')
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join('');
}
    
/**
 * Decrypt a string encrypted by cipher method
 * @param {string} salt string encrypted
 * @returns decrypted string
 */
const decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join('');
}

const myCipher = cipher(SECRET_PASSWORD_UwU)
const myDecipher = decipher(SECRET_PASSWORD_UwU)