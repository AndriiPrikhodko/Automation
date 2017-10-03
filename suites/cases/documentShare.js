var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');

var dispatcher = new Dispatcher("action -> share document");
var assert     = new Assert(dispatcher);

exports.execute = function(user_email){
  var DriverMod         = require( '../../classes/DriverBox.class.js').getDriver();
  return Promises.chaining([
                              () => dispatcher.Executing(),
                              DriverMod.ClickOn              ('xpath', "// span [contains (.,'Share for review')]"),
                              DriverMod.WaitForElement       ('xpath', "// button [contains (.,'Share and start track changes')]"),
                              DriverMod.WaitForElementEnabled(DriverMod.FindElement('xpath', "// input [@ng-model = 'model.form.user']")),
                              DriverMod.EnterTo              ('xpath', "// input [@ng-model = 'model.form.user']", user_email),
                              DriverMod.ClickOn              ('xpath', "// button [@ng-disabled = 'invitationForm.$invalid']"),
                              DriverMod.WaitForElementVisible('xpath', "// button [contains (.,'Share and start track changes')]"),
                              DriverMod.ClickOn              ('xpath', "// button [contains (.,'Share and start track changes')]"),
                              DriverMod.WaitStalenessOf(DriverMod.FindElement('xpath', "// button [contains (.,'Share and start track changes')]")),
                              DriverMod.waitForInnerHTML(DriverMod.FindElement("css", "span.label"), config.DOC_TYPES[1]),
                              DriverMod.getInnerHTML(DriverMod.FindElement("css", "span.label")),
                              document_label => assert.Equals(document_label, config.DOC_TYPES[1], "document label is " + config.DOC_TYPES[1]),
                              () => DriverMod.sleep(config.SAVE_TIME),
                              () => dispatcher.Completed()
        ])
}
