var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');
var dispatcher        = new Dispatcher( "action -> open draft list" );
var assert            = new Assert(dispatcher);

exports.execute = function(){
  var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
  return Promises.chaining([
                           () => dispatcher.Executing(),
                           DriverMod.WaitForElementVisible('xpath', "// a [ @uib-tooltip = 'Show all my draft sections']"),
                           DriverMod.ClickOn       ('xpath', "// a [ @uib-tooltip = 'Show all my draft sections']"),
                           DriverMod.WaitForElementVisible('xpath', "// h4 [contains (.,'Draft sections')]"),
                           () => dispatcher.Completed()
                         ])
}
