
var Md5Crypt = require('./md5-crypt');
var UnixCrypt = require('./unix-crypt');

function crypt(key, salt) {

    if (!salt) {
        throw new Error('sha2 crypt not implemented yet');
    }

    //if (salt == null) {
    //    return Sha2Crypt.sha512Crypt(keyBytes);
    //} else if (salt.startsWith(Sha2Crypt.SHA512_PREFIX)) {
    //    return Sha2Crypt.sha512Crypt(keyBytes, salt);
    //} else if (salt.startsWith(Sha2Crypt.SHA256_PREFIX)) {
    //    return Sha2Crypt.sha256Crypt(keyBytes, salt);
    //} else
    if (salt.indexOf(Md5Crypt.MD5_PREFIX) == 0) {
        return Md5Crypt.crypt(key, salt);
    } else {
        return UnixCrypt.crypt(key, salt);
    }
}


module.exports = {
    crypt: crypt
}