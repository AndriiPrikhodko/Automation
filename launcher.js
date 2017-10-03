var config = require('./config');
var list = require('./suite_list')
var Promises = require('./suites/helpers/promiseHelper');
var R = require('ramda');
const osTmpdir = require('os-tmpdir');
osTmpdir();

if (config.USE_AUTORUN){
 Promises.chaining([R.map(suite => suite.execute())(list.SUITES)]);
}

else console.log('Set "USE_AUTORUN = true" in config to run tests from autorun.sh');
