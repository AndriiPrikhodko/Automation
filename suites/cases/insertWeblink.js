var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');
var dispatcher        = new Dispatcher( "action -> insert weblink" );
var assert            = new Assert(dispatcher);

exports.execute = function(weblink){
  var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
  return Promises.chaining([
           () => dispatcher.Executing(),
           DriverMod.ClickOn       ( 'css' , "button.smashdoc-toolbar-links" ),
           DriverMod.WaitForElement( 'xpath' , "// button [ @data-inlinetag = 'weblink' ]" ),
           DriverMod.ClickOn       ( 'xpath' , "// button [ @data-inlinetag = 'weblink' ]" ),
           DriverMod.EnterTo       ( 'css' ,  "div.smashdoc-weblink-content" , weblink.name ),
           DriverMod.EnterTo       ( 'css' ,  "input.smashdoc-new-link" , weblink.address ),
           DriverMod.ClickOn       ( 'xpath' , "// button [ contains (.,'Save') ]" ),
           () => dispatcher.Completed()
         ]);
}
