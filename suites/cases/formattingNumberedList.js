var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Promises          = require('../helpers/promiseHelper');
var Assert            = require( '../../classes/Assert.class.js' );
var dispatcher        = new Dispatcher( "action -> apply numbered list" );
var assert            = new Assert(dispatcher);

exports.execute = function(){
 var DriverMod         = require( '../../classes/DriverBox.class.js').getDriver();
 return  Promises.chaining([
                         () => dispatcher.Executing(),
                         DriverMod.WaitForElementVisible( 'xpath' , "// button [ @data-text-type = 'list-ol' ]"),
                         DriverMod.ClickOn       ( 'xpath' , "// button [ @data-text-type = 'list-ol' ]"),
                         DriverMod.FindAllElements( 'css' ,  "div.smashdoc-element"),
                         SD_sections => SD_sections[ SD_sections.length - 1 ],
                         last_section => DriverMod.waitForAttrAssigned(last_section, "data-texttype", "list-ol"),
                         DriverMod.FindElement('css', ".smashdoc-selected-section").getAttribute("data-texttype"),
                         formatting => assert.Equals(formatting, "list-ol", "formatting: " + "list-ol"),
                         dispatcher.Completed()
                       ]);
}
