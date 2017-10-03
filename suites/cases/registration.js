var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');
var dispatcher = new Dispatcher("Registration");
var assert     = new Assert(dispatcher);

exports.execute = function(){
 return Promises.chaining([
          DriverMod = require( '../../classes/DriverBox.class.js').getDriver(),
          () => dispatcher.Executing(),
          DriverMod.get(config.LOGIN_PAGE),
          DriverMod.WaitForElement('xpath', "// a [ @ui-sref = 'global.register']"),
          DriverMod.ClickOn('xpath', "// a [ @ui-sref = 'global.register']"),
          DriverMod.WaitForElement('xpath',  "// input [ @ng-model = 'model.firstname' ]"),
          DriverMod.EnterTo('xpath',  "// input [ @ng-model = 'model.firstname' ]", config.USER_NAME),
          DriverMod.EnterTo('xpath',  "// input [ @ng-model = 'model.lastname' ]", config.USER_LAST_NAME),
          DriverMod.EnterTo('xpath',  "// input [ @ng-model = 'model.company' ]", config.USER_COMPANY),
          DriverMod.EnterTo('xpath',  "// input [ @ng-model = 'model.email' ]", config.USER_EMAIL_REGISTER),
          DriverMod.EnterTo('xpath',  "// input [ @ng-model = 'model.password' ]", config.USER_PASSWORD),
          DriverMod.ClickOn('xpath',  "// input [ @ng-model = 'model.accepted_tos' ]"),
          DriverMod.ClickOn('xpath',  "// input [ @type = 'submit' ]"),
          DriverMod.WaitForElementVisible('css',  "div.alert-success"),
          DriverMod.FindElement('css',  "div.alert-success span").getText(),
          text => assert.Equals(text, "Your account has been created successfully. Please check your emails." , "success label is 'Your account has been created successfully. Please check your emails.'"),
          () => dispatcher.Completed()
    ])
}
