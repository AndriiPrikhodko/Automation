var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');
var dispatcher        = new Dispatcher( "action -> close left wing" );
var assert            = new Assert(dispatcher);

exports.execute = function(){
  var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
  return Promises.chaining([
                           () => dispatcher.Executing(),
                           DriverMod.WaitForElementVisible('css', "a.doc-layout-close-button"),
                           DriverMod.ClickOn       ('css', "a.doc-layout-close-button"),
                           () => dispatcher.Completed()
                         ])
}
