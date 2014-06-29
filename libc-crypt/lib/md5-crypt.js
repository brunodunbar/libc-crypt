
var CryptUtil = require('./crypt-util');
var crypto = require('crypto');

var MD5_PREFIX = "$1$";
var BLOCKSIZE = 16;
var ROUNDS = 1000;

function crypt(key, salt, prefix) {

    if (!(key instanceof Buffer)) {
        key = new Buffer(key);
    }

    if (!prefix) {
        prefix = MD5_PREFIX;
    }

    var keyLen = key.length;

    if (salt == null) {
        salt = CryptUtil.createRandomSalt(8);
    } else {
        var matcher = CryptUtil.isValidMd5Salt(prefix, salt);
        if (!matcher) {
            throw new Error("Invalid salt value: " + salt);
        }
        salt = matcher[1];
    }

    salt = new Buffer(salt);

    var ctx = crypto.createHash("md5");
    ctx.update(key);
    ctx.update(prefix);
    ctx.update(salt);

    var ctx1 = crypto.createHash("md5");
    ctx1.update(key);
    ctx1.update(salt);
    ctx1.update(key);

    var finalb = ctx1.digest();
    var ii = keyLen;
    while (ii > 0) {
        ctx.update(finalb.slice(0, ii > 16 ? 16 : ii));
        ii -= 16;
    }

    for (var i = 0; i < finalb.length; i++) {
        finalb[i] = 0;
    }

    ii = keyLen;
    var j = 0;
    while (ii > 0) {
        if ((ii & 1) == 1) {
            ctx.update(finalb.slice(j, j + 1));
        } else {
            ctx.update(key.slice(j, j + 1));
        }
        ii >>= 1;
    }

    finalb = ctx.digest();

    for (var i = 0; i < ROUNDS; i++) {
        ctx1 = crypto.createHash("md5");
        if ((i & 1) != 0) {
            ctx1.update(key);
        } else {
            ctx1.update(finalb, 0, BLOCKSIZE);
        }       

        if (i % 3 != 0) {
            ctx1.update(salt);
        }

        if (i % 7 != 0) {
            ctx1.update(key);
        }

        if ((i & 1) != 0) {
            ctx1.update(finalb.slice(0, BLOCKSIZE));
        } else {
            ctx1.update(key);
        }
        finalb = ctx1.digest();
    }

    var passwd = prefix + salt.toString('ascii') + "$";
    passwd += CryptUtil.b64from24bit(finalb[0], finalb[6], finalb[12], 4);
    passwd += CryptUtil.b64from24bit(finalb[1], finalb[7], finalb[13], 4);
    passwd += CryptUtil.b64from24bit(finalb[2], finalb[8], finalb[14], 4);
    passwd += CryptUtil.b64from24bit(finalb[3], finalb[9], finalb[15], 4);
    passwd += CryptUtil.b64from24bit(finalb[4], finalb[10], finalb[5], 4);
    passwd += CryptUtil.b64from24bit(0, 0, finalb[11], 2);

    return passwd;
}

module.exports = {
    MD5_PREFIX: MD5_PREFIX,
    crypt: crypt
}