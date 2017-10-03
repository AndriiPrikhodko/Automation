var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var By                = require( 'selenium-webdriver' ).By;
var Promises          = require('../helpers/promiseHelper');
var dispatcher        = new Dispatcher( "action -> decide section from changes" );
var assert            = new Assert(dispatcher);

exports.execute = function(section, accept = true){
  var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
  return Promises.chaining([
                           () => dispatcher.Executing(),
                           DriverMod.WaitForElementVisible('xpath', '// div [ @ng-repeat ="section in model.sections = ($editor.model.changedSections | filter:(model.filter.value||\'\') | limitTo:limit)"]'),
                           () => DriverMod.sleep(300),
                           () => DriverMod.FindAllElements('xpath', '// div [ @ng-repeat ="section in model.sections = ($editor.model.changedSections | filter:(model.filter.value||\'\') | limitTo:limit)"]'),
                           sections_in_changes => sections_in_changes[section - 1].click(),
                           () => DriverMod.WaitForElement('xpath', "// a [ @uib-tooltip = 'Accept changes']"),
                           () => accept ? DriverMod.FindElement('xpath', "// a [ @uib-tooltip = 'Accept changes']") : DriverMod.FindElement('xpath', "// a [ @uib-tooltip = 'Decline changes']"),
                           decision => {
                             decision.click();
                             return decision;
                           },
                           decided_section => DriverMod.WaitStalenessOf(decided_section),
                           () => assert.validate(true, "section " + section + (accept ? " accepted" : " rejected")),
                           () => dispatcher.Completed()
                         ])
}
