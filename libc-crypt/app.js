var Md5Crypt = require('./lib/md5-crypt');

var crypted = Md5Crypt.crypt("123456", "$1$abcdefgh$");

console.log(crypted);