
var SALT_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345678./";
var B64T = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function createRandomSalt(num) {
    var numSaltChars = SALT_CHARS.length;
    var salt = "";
    for (var i = 0; i < num; i++) {
        salt += SALT_CHARS[randomInt(0, numSaltChars)];
    }

    return salt;
}

function isValidUnixSalt(salt) {
    return salt.match("^[" + SALT_CHARS + "]{2,}$");
}

function isValidMd5Salt(prefix, salt) {
    return salt.match("^" + prefix.replace(/\$/g, "\\$") + "([" + SALT_CHARS + "]{1,8}).*");
}

function b64from24bit(b2, b1, b0, outLen) {
    var w = ((b2 << 16) & 0x00ffffff) | ((b1 << 8) & 0x00ffff) | (b0 & 0xff);
    var result = "";
    var n = outLen;
    while (n-- > 0) {
        result += B64T[w & 0x3f];
        w >>= 6;
    }

    return result;
}

module.exports = {
    createRandomSalt: createRandomSalt,
    isValidUnixSalt: isValidUnixSalt,
    isValidMd5Salt: isValidMd5Salt,
    b64from24bit: b64from24bit
}