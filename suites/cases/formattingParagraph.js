var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');
var dispatcher        = new Dispatcher( "action -> clean formatting" );
var assert            = new Assert(dispatcher);

exports.execute = function(){
 return   Promises.chaining([
                         DriverMod  = require( '../../classes/DriverBox.class.js').getDriver(),
                         () => dispatcher.Executing(),
                         DriverMod.ClickOn       ( 'xpath' , "// button [ @data-text-type = 'heading' ]" ),
                         DriverMod.WaitForElement( 'css' , "div.headings-remove" ),
                         DriverMod.ClickOn       ( 'css' , "div.headings-remove" ),
                         DriverMod.FindElement('css', ".smashdoc-selected-section").getAttribute("data-texttype"),
                         formatting => assert.Equals(formatting, "paragraph", "formatting: " + "paragraph"),
                         () => dispatcher.Completed()
                       ]);
}
