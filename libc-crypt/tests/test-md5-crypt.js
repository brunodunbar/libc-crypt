var Md5Crypt = require('../lib/md5-crypt');

module.exports = {

    testValidPassword: function (test) {
        var crypted = Md5Crypt.crypt("validPass", "$1$abcdefgh$");
        console.log(crypted);
        test.done();
    },
}