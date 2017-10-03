var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Promises          = require('../helpers/promiseHelper');
var Assert            = require( '../../classes/Assert.class.js' );
var dispatcher        = new Dispatcher( "action -> apply italic style" );
var assert            = new Assert(dispatcher);

exports.execute = function(){
 return  Promises.chaining([
                         DriverMod  = require( '../../classes/DriverBox.class.js').getDriver(),
                         () => dispatcher.Executing(),
                         DriverMod.WaitForElement( 'xpath' , "// button [ @data-format = 'italic' ]"),
                         DriverMod.ClickOn       ( 'xpath' , "// button [ @data-format = 'italic' ]"),
                         DriverMod.getInnerHTML(DriverMod.FindElement('css', ".smashdoc-selected-section div.smashdoc-element-text")),
                         html => assert.validate( html.indexOf("<i>") > -1, "style: " + "italic"),
                         () => dispatcher.Completed()
                       ]);
}
