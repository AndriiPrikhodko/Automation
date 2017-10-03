var config            = require( '../config' );
var dispatcher        = require( '../classes/Dispatcher.class.js' );
var Promises          = require('./helpers/promiseHelper');
var DriverBox         = require('../classes/DriverBox.class.js');
var driver            = require( '../classes/DriverMod.class' );
var login 		        = require( './cases/login.js' );
var registration 	    = require( './cases/registration.js' );

dispatcher = new dispatcher("Suite1");

function execute(){
  return Promises.chaining([
            () => DriverBox.storeDriver(new driver).getDriver(),
            () => dispatcher.SetMessage("Registration, Login").PostfixMessage(),
            () => dispatcher.Executing(),
            () => registration.execute(),
            () => login.execute(),
            () => DriverMod.quit(),
            () => dispatcher.Completed()
          ])
}

if(!config.USE_AUTORUN) execute();
else dispatcher.SetMessage("Autorun").PrefixMessage();

module.exports.execute = execute;
