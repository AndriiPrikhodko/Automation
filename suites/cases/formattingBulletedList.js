var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Promises          = require('../helpers/promiseHelper');
var Assert            = require( '../../classes/Assert.class.js' );
var dispatcher        = new Dispatcher( "action -> apply bulleted list" );
var assert            = new Assert(dispatcher);

exports.execute = function(){
 var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
 return  Promises.chaining([
                         () => dispatcher.Executing(),
                         DriverMod.WaitForElement( 'xpath' , "// button [ @data-text-type = 'list' ]"),
                         DriverMod.ClickOn       ( 'xpath' , "// button [ @data-text-type = 'list' ]"),
                         DriverMod.FindAllElements( 'css' ,  "div.smashdoc-element"),
                         SD_sections => SD_sections[ SD_sections.length - 1 ],
                         last_section => DriverMod.waitForAttrAssigned(last_section, "data-texttype", "list"),
                         () => DriverMod.FindElement('css', ".smashdoc-selected-section").getAttribute("data-texttype"),
                         formatting => assert.Equals(formatting, "list", "formatting: " + "list"),
                         () => dispatcher.Completed()
                       ]);
}
