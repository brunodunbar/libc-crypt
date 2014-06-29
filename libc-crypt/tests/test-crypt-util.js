var CryptUtil = require('../lib/crypt-util');

module.exports = {
    testIsValidUnixSalt: function (test) {
        test.ok(CryptUtil.isValidUnixSalt("B5xBYM2HbnPqI"), "valid unix salt");
        test.done();
    },
    testIsInvalidUnixSalt: function (test) {
        test.ok(!CryptUtil.isValidUnixSalt("&&xBYM2HbnPqI"), "invalid unix salt");
        test.done();
    },
}