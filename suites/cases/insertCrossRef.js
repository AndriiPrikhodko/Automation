var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');
var dispatcher        = new Dispatcher( "action -> insert crossRef" );
var assert            = new Assert(dispatcher);

exports.execute = function(crossRef){
  var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
  return Promises.chaining([
           () => dispatcher.Executing(),
           DriverMod.ClickOn       ('css', "button.smashdoc-toolbar-links"),
           DriverMod.WaitForElement('xpath', "// button [ @data-inlinetag = 'internalWeblink']"),
           DriverMod.ClickOn       ('xpath', "// button [ @data-inlinetag = 'internalWeblink']"),
           DriverMod.sleep         (config.SAVE_TIME),
           DriverMod.WaitForElementVisible('css', "a.list-group-item:nth-of-type(" + crossRef.item + ")"),
           DriverMod.ClickOn       ('css', "a.list-group-item:nth-of-type(" + crossRef.item + ")"),
           DriverMod.ClickOn       ('xpath', "// button [ contains (.,'Create') ]"),
           () => dispatcher.Completed()
         ]);
}
