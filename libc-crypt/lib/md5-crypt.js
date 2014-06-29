﻿
var CryptUtil = require('./crypt-util');

var MD5_PREFIX = "$1$";

module.exports = {
    MD5_PREFIX: MD5_PREFIX,
    crypt:  function(key, salt, prefix) {

        if (!(key instanceof Buffer)) {
            key = new Buffer(key);
        }

        if (!prefix) {
            prefix = MD5_PREFIX;
        }

        var keyLen = key.length;

        // Extract the real salt from the given string which can be a complete hash string.
        if (salt == null) {
            salt = CryptUtil.createRandomSalt(8);
        } else {

            salt = CryptUtil.createRandomSalt(8);
            console.log("^" + prefix.replace(/\$/g, "\\$") + "([\\.\\/a-zA-Z0-9]{1,8}).*");
            var matcher = salt.match(new RegExp("^" + prefix.replace("\$", "\\$") + "([\\.\\/a-zA-Z0-9]{1,8}).*"));
            console.log(matcher);
            if (!matcher) {
                throw new Error("Invalid salt value: " + salt);
            }
            salt = matcher(1);
        }

        salt = new Buffer(salt);

        return salt;

    //    final MessageDigest ctx = DigestUtils.getMd5Digest();

    //    /*
    //     * The password first, since that is what is most unknown
    //     */
    //    ctx.update(keyBytes);

    //    /*
    //     * Then our magic string
    //     */
    //    ctx.update(prefix.getBytes(Charsets.UTF_8));

    //    /*
    //     * Then the raw salt
    //     */
    //    ctx.update(saltBytes);

    //    /*
    //     * Then just as many characters of the MD5(pw,salt,pw)
    //     */
    //    MessageDigest ctx1 = DigestUtils.getMd5Digest();
    //    ctx1.update(keyBytes);
    //    ctx1.update(saltBytes);
    //    ctx1.update(keyBytes);
    //    byte[] finalb = ctx1.digest();
    //    int ii = keyLen;
    //    while (ii > 0) {
    //        ctx.update(finalb, 0, ii > 16 ? 16 : ii);
    //        ii -= 16;
    //    }

    //    /*
    //     * Don't leave anything around in vm they could use.
    //     */
    //    Arrays.fill(finalb, (byte) 0);

    //    /*
    //     * Then something really weird...
    //     */
    //    ii = keyLen;
    //    final int j = 0;
    //    while (ii > 0) {
    //        if ((ii & 1) == 1) {
    //            ctx.update(finalb[j]);
    //        } else {
    //            ctx.update(keyBytes[j]);
    //        }
    //        ii >>= 1;
    //    }

    //    /*
    //     * Now make the output string
    //     */
    //    final StringBuilder passwd = new StringBuilder(prefix + saltString + "$");
    //    finalb = ctx.digest();

    //    /*
    //     * and now, just to make sure things don't run too fast On a 60 Mhz Pentium this takes 34 msec, so you would
    //     * need 30 seconds to build a 1000 entry dictionary...
    //     */
    //    for (int i = 0; i < ROUNDS; i++) {
    //        ctx1 = DigestUtils.getMd5Digest();
    //        if ((i & 1) != 0) {
    //            ctx1.update(keyBytes);
    //    } else {
    //                ctx1.update(finalb, 0, BLOCKSIZE);
    //}

    //if (i % 3 != 0) {
    //    ctx1.update(saltBytes);
    //}

    //if (i % 7 != 0) {
    //    ctx1.update(keyBytes);
    //}

    //if ((i & 1) != 0) {
    //    ctx1.update(finalb, 0, BLOCKSIZE);
    //} else {
    //    ctx1.update(keyBytes);
    //}
    //finalb = ctx1.digest();
    //}

    //// The following was nearly identical to the Sha2Crypt code.
    //// Again, the buflen is not really needed.
    //// int buflen = MD5_PREFIX.length() - 1 + salt_string.length() + 1 + BLOCKSIZE + 1;
    //B64.b64from24bit(finalb[0], finalb[6], finalb[12], 4, passwd);
    //B64.b64from24bit(finalb[1], finalb[7], finalb[13], 4, passwd);
    //B64.b64from24bit(finalb[2], finalb[8], finalb[14], 4, passwd);
    //B64.b64from24bit(finalb[3], finalb[9], finalb[15], 4, passwd);
    //B64.b64from24bit(finalb[4], finalb[10], finalb[5], 4, passwd);
    //B64.b64from24bit((byte) 0, (byte) 0, finalb[11], 2, passwd);

    ///*
    // * Don't leave anything around in vm they could use.
    // */
    //// Is there a better way to do this with the JVM?
    //ctx.reset();
    //ctx1.reset();
    //Arrays.fill(keyBytes, (byte) 0);
    //Arrays.fill(saltBytes, (byte) 0);
    //Arrays.fill(finalb, (byte) 0);

    //return passwd.toString();
    }
}