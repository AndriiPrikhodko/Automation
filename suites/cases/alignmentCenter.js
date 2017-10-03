var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Promises          = require('../helpers/promiseHelper');
var Assert            = require( '../../classes/Assert.class.js' );

var dispatcher        = new Dispatcher( "action -> align center" );
var assert            = new Assert(dispatcher);

exports.execute = function(){
 var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
 return  Promises.chaining([
                         () => dispatcher.Executing(),
                         DriverMod.WaitForElement('css', "button.smashdoc-toolbar-all-align" ),
                         DriverMod.ClickOn       ('css', "button.smashdoc-toolbar-all-align" ),
                         DriverMod.WaitForElement('xpath', "// button [ @data-format = 'text-alignment-center' ]"),
                         DriverMod.ClickOn       ('xpath', "// button [ @data-format = 'text-alignment-center' ]"),
                         DriverMod.FindElement   ('css',".smashdoc-selected-section").getAttribute("data-alignment"),
                         alignment => assert.Equals(alignment, "center","alignment: " + "center"),
                         () => dispatcher.Completed()
                       ]);
}
