
var SALT_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345678./";

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

function isValidSalt(salt) {
    return !salt.match("^[" + SALT_CHARS + "]{2,}$");
}

module.exports = {
    createRandomSalt: createRandomSalt,
    isValidSalt: isValidSalt
}