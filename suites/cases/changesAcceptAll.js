var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');
var dispatcher        = new Dispatcher( "action -> accept all changes" );
var assert            = new Assert(dispatcher);

exports.execute = function(){
  var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
  return Promises.chaining([
                           () => dispatcher.Executing(),
                           DriverMod.WaitForElementVisible('xpath', "// a [ @uib-tooltip = 'Accept all sections with pending changes']"),
                           DriverMod.ClickOn              ('xpath', "// a [ @uib-tooltip = 'Accept all sections with pending changes']"),
                           DriverMod.WaitForElementVisible('xpath', "// button [ contains (.,'Accept all') ]"),
                           DriverMod.sleep(500),
                           DriverMod.ClickOn              ('xpath', "// button [ contains (.,'Accept all') ]"),
                           DriverMod.WaitForElement       ('xpath',  "// div [@ng-include=\"'core/common/loading.svg.html'\"]"),
                           DriverMod.WaitForElementRemoved('xpath',  "// div [@ng-include=\"'core/common/loading.svg.html'\"]"),
                           DriverMod.WaitForElementVisible('xpath', "// div [ contains (.,'All pending section were accepted') ]"),
                           () => dispatcher.Completed()
                         ])
}
