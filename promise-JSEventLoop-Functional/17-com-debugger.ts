const load = require('lodash');

// load.split(',');

const split = load.curry((sep,str)=> load.split(str,sep));

const join = _.curry((sep,array)=> load.join(array,sep));