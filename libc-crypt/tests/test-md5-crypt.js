var Md5Crypt = require('../lib/md5-crypt');

module.exports = {

    testValidPassword: function (test) {
        var crypted = Md5Crypt.crypt("123456", "$1$abcdefgh$");
        test.equals("$1$abcdefgh$KJHEbEnUJaxWv269o9nH60", crypted, "wrong password");
        test.done();
    },
}