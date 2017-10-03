var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var By                = require( 'selenium-webdriver' ).By;
var Promises          = require('../helpers/promiseHelper');
var dispatcher        = new Dispatcher( "action -> share item from draft list" );
var assert            = new Assert(dispatcher);

exports.execute = function(section){
  var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
  return Promises.chaining([
                           () => dispatcher.Executing(),
                           DriverMod.WaitForElementVisible('xpath', "// div [ @ng-repeat ='section in $editor.model.draftSections | limitTo: limit']"),
                           () => DriverMod.sleep(300),
                           () => DriverMod.FindAllElements('xpath', "// div [ @ng-repeat ='section in $editor.model.draftSections | limitTo: limit']"),
                           sections_in_draft_list => sections_in_draft_list[section - 1].click(),
                           () => DriverMod.WaitForElement('xpath', "// a [ @uib-tooltip = 'Share section for review']"),
                           () => DriverMod.FindElement('xpath', "// a [ @uib-tooltip = 'Share section for review']"),
                           share_for_review => {
                             share_for_review.click();
                             return share_for_review;
                           },
                           shared_section => DriverMod.WaitStalenessOf(shared_section),
                           () => assert.validate(true, "section " + section + " shared to review"),
                           () => dispatcher.Completed()
                         ])
}
