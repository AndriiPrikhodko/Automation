var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Promises          = require('../helpers/promiseHelper');
var Assert            = require( '../../classes/Assert.class.js' );
var dispatcher        = new Dispatcher( "action -> apply numbered paragraph" );
var assert            = new Assert(dispatcher);

exports.execute = function(level){
 var DriverMod         = require( '../../classes/DriverBox.class.js').getDriver();
 return  Promises.chaining([
                         () => dispatcher.Executing(),
                         DriverMod.WaitForElement( 'xpath' , "// button [ @data-text-type = 'paragraph-ol' ]"),
                         DriverMod.ClickOn       ( 'xpath' , "// button [ @data-text-type = 'paragraph-ol' ]"),
                         DriverMod.WaitForElementVisible( 'xpath' , "// div [ @data-enumeration-type = " + (level -1) + " ]"),
                         DriverMod.ClickOn       ( 'xpath' , "// div [ @data-enumeration-type = " + (level -1) + " ]"),
                         DriverMod.FindAllElements( 'css' ,  "div.smashdoc-element"),
                         SD_sections => SD_sections[ SD_sections.length - 1 ],
                         last_section => DriverMod.waitForAttrAssigned(last_section, "data-texttype", "paragraph-ol"),
                         DriverMod.FindElement('css', ".smashdoc-selected-section").getAttribute("data-texttype"),
                         formatting => assert.Equals(formatting, "paragraph-ol", "formatting: " + "paragraph-ol"),
                         () => dispatcher.Completed()
                       ]);
}
