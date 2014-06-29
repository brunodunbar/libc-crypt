var Crypt = require('../lib/crypt');

module.exports = {
    testMd5Password: function (test) {
        var crypted = Crypt.crypt("123456", "$1$abcdefgh$");
        test.equals("$1$abcdefgh$KJHEbEnUJaxWv269o9nH60", crypted, "not a md5 password");
        test.done();
    },

    testUnixPassword: function (test) {
        var crypted = Crypt.crypt("validPass", "B5xBYM2HbnPqI");
        test.equal(crypted, "B5xBYM2HbnPqI", "not a unix password");
        test.done();
    },
}