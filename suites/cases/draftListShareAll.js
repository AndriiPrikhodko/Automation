var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');
var dispatcher        = new Dispatcher( "action -> share all for review" );
var assert            = new Assert(dispatcher);

exports.execute = function(){
  var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
  return Promises.chaining([
                           () => dispatcher.Executing(),
                           DriverMod.WaitForElementVisible('xpath', "// a [ contains (.,'Share all') ]"),
                           DriverMod.ClickOn       ('xpath', "// a [ contains (.,'Share all') ]"),
                           DriverMod.WaitForElementVisible('xpath', "// button [ contains (.,'Share all') ]"),
                           DriverMod.sleep(500),
                           DriverMod.ClickOn       ('xpath', "// button [ contains (.,'Share all') ]"),
                           DriverMod.WaitForElement('xpath',  "// div [@ng-include=\"'core/common/loading.svg.html'\"]"),
                           DriverMod.WaitForElementRemoved('xpath',  "// div [@ng-include=\"'core/common/loading.svg.html'\"]"),
                           DriverMod.WaitForElementVisible('xpath', "// div [ contains (.,'All draft sections are shared for review.') ]"),
                           DriverMod.WaitForElement('css', "div.done-icon"),
                           () => dispatcher.Completed()
                         ])
}
