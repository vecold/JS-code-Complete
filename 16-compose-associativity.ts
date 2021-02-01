const ttl = require('lodash');

const fn = ttl.flowRight(ttl.flowRight(ttl.toUpper,ttl.first),ttl.reverse);
console.log(fn(['one','tow','three']))