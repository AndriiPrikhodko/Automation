var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');
var dispatcher        = new Dispatcher( "action -> insert footnote" );
var assert            = new Assert(dispatcher);

exports.execute = function(footnote){
  var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
  return Promises.chaining([
                           () => dispatcher.Executing(),
                           DriverMod.ClickOn       ( 'css' , "button.smashdoc-toolbar-footnote" ),
                           DriverMod.WaitForElement( 'css' , "textarea.smashdoc-footnote-text-container" ),
                           DriverMod.EnterTo       ( 'css' , "textarea.smashdoc-footnote-text-container" , footnote.content ),
                           DriverMod.ClickOn       ( 'xpath' , "// button [ contains (.,'Save') ]" ),
                           () => dispatcher.Completed()
                         ])
}
