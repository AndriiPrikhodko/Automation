var config            = require( '../config' );
var driver 		        = require( '../classes/DriverMod.class' );
var DriverBox         = require('../classes/DriverBox.class.js');
var dispatcher        = require( '../classes/Dispatcher.class.js' );
var Promises          = require('./helpers/promiseHelper');

var login 		        = require( './cases/login.js' );
var deleteDocument    = require( './cases/deleteDocument.js' );

dispatcher = new dispatcher("Suite4");

function execute(){
  return Promises.chaining([
                            () => DriverMod = DriverBox.storeDriver(new driver).getDriver(),
                            () => dispatcher.SetMessage("Login, deleteDocument").PostfixMessage(),
                            () => dispatcher.Executing(),
                            () => login.execute(),
                            () => deleteDocument.execute(),
                            () => DriverMod.quit(),
                            () => dispatcher.Completed()
                          ])
}

if(!config.USE_AUTORUN) execute();
else dispatcher.SetMessage("Autorun").PrefixMessage();

module.exports.execute = execute;
