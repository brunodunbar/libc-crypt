var UnixCrypt = require('../lib/unix-crypt');

module.exports = {

    testValidPassword: function (test) {
        var crypted = UnixCrypt.crypt("validPass", "B5xBYM2HbnPqI");
        test.equal(crypted, "B5xBYM2HbnPqI", "Wrong password!");
        test.done();
    },

    testInValidPassword: function (test) {
        var crypted = UnixCrypt.crypt("invalidPass", "B5xBYM2HbnPqI");
        test.notEqual(crypted, "B5xBYM2HbnPqI", "Wrong password!");
        test.done();
    }
}