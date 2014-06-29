
var Md5Crypt = require('./md5-crypt');
var UnixCrypt = require('./unix-crypt');


module.exports = function crypt(key, salt) {
    //if (salt == null) {
    //    return Sha2Crypt.sha512Crypt(keyBytes);
    //} else if (salt.startsWith(Sha2Crypt.SHA512_PREFIX)) {
    //    return Sha2Crypt.sha512Crypt(keyBytes, salt);
    //} else if (salt.startsWith(Sha2Crypt.SHA256_PREFIX)) {
    //    return Sha2Crypt.sha256Crypt(keyBytes, salt);
    //} else
    if (salt.indexOf(Md5Crypt.MD5_PREFIX) == 0) {
        return Md5Crypt.md5Crypt(key, salt);
    } else {
        return UnixCrypt.crypt(key, salt);
    }
}