var CryptoJS = require("crypto-js");

const generateToken = (name, userID, coins, loginType) => {
    let token = CryptoJS.AES.encrypt(JSON.stringify({ name, userID, coins, loginType }), "NoPointToChange").toString();
    return token;
}

const decryptToken = (token) => {
    let bytes = CryptoJS.AES.decrypt(token, "NoPointToChange");
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}
    
module.exports = { generateToken, decryptToken }