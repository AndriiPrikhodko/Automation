var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');
var dispatcher        = new Dispatcher( "action -> delete section" );
var assert            = new Assert(dispatcher);

exports.execute = function(DriverMod){

return Promises.chaining([
         ()  => dispatcher.Executing(),
         DriverMod.WaitForElementVisible( 'css' , "div.delete-section" ),
         DriverMod.ClickOn( 'css' , "div.delete-section" ),
         () => dispatcher.Completed()
       ]);
}
