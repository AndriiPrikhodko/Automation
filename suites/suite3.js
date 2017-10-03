var config                = require( '../config' );
var driver 		            = require( '../classes/DriverMod.class' );
var DriverBox             = require('../classes/DriverBox.class.js');
var doc 	                = require( '../provisions/articles/import1' ).DOCUMENT;
var assertSectionsSaved   = require( './cases/assertSectionsSaved.js' );
var dispatcher            = require( '../classes/Dispatcher.class.js' );
var login 		            = require( './cases/login.js' );
var importDocument        = require( './cases/importDOCX.js' );
var Promises              = require('./helpers/promiseHelper');
dispatcher = new dispatcher("Suite3");

function execute(){
  return Promises.chaining([
            () => DriverMod = DriverBox.storeDriver(new driver).getDriver(),
            () => dispatcher.SetMessage("Login, importDocument").PostfixMessage(),
            () => dispatcher.Executing(),
            () => login.execute(),
            () => importDocument.execute(),
            () => DriverMod.quit(),
            () => dispatcher.Completed()
          ])
}

if(!config.USE_AUTORUN) execute();
else dispatcher.SetMessage("Autorun").PrefixMessage();

module.exports.execute = execute;
