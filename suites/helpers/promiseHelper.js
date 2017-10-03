var webdriver         = require( 'selenium-webdriver' );
var R                 = require('ramda');

exports.chaining =
  promises => R.reduce((chain,promise) => typeof(promise) == 'function' ? chain = chain.then(promise) : chain = chain.then(() => promise),webdriver.promise.when())
  (promises);
