var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');
var dispatcher        = new Dispatcher( "action -> delete section" );
var assert            = new Assert(dispatcher);

exports.execute = function(DriverMod){

return Promises.chaining([
         function(){dispatcher.Executing()},
         DriverMod.WaitForElementVisible('css', "div.smashdoc-element-header"),
         DriverMod.ClickOn('css', "div.pulldown"),
         DriverMod.WaitForElementVisible('css', "div.add-pagebreak"),
         DriverMod.ClickOn('css', "div.add-pagebreak"),
         function(){dispatcher.Completed()}
       ]);
}
