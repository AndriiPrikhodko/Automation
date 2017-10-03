var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Promises          = require('../helpers/promiseHelper');
var Assert            = require( '../../classes/Assert.class.js' );
var dispatcher        = new Dispatcher( "action -> outdent" );
var assert            = new Assert(dispatcher);

exports.execute = function(){
 var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
 return  Promises.chaining([
                         () => dispatcher.Executing(),
                         DriverMod.WaitForElementVisible('xpath', "// button [ @data-dir = 'left' ]"),
                         DriverMod.ClickOn       ('xpath', "// button [ @data-dir = 'left' ]"),
                         () => dispatcher.Completed()
                       ]);
}
