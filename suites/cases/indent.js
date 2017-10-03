var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Promises          = require('../helpers/promiseHelper');
var Assert            = require( '../../classes/Assert.class.js' );
var dispatcher        = new Dispatcher( "action -> indent" );
var assert            = new Assert(dispatcher);

exports.execute = function(current_level){
 var DriverMod         = require( '../../classes/DriverBox.class.js').getDriver();
 return  Promises.chaining([
                         () => dispatcher.Executing(),
                         DriverMod.FindAllElements('css', "div.smashdoc-more-btn.open"),
                         toolbar_is_opened => toolbar_is_opened.length == 0 ? DriverMod.ClickOn('css', "div.smashdoc-more-btn") : true,
                         () => DriverMod.WaitForElement('css', "div.smashdoc-more-btn.open"),
                         () => DriverMod.ClickOn       ('xpath', "// button [ @data-dir = 'right' ]"),
                         () => DriverMod.FindElement('css', ".smashdoc-selected-section").getAttribute("data-indent"),
                         new_level => assert.Equals(parseInt(new_level), parseInt(current_level)+1, "indent level: " + (parseInt(current_level)+1)),
                         () => dispatcher.Completed()
                       ]);
}
