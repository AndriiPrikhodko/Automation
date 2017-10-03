var config  	        = require( '../../config');
var Dispatcher        = require( '../../classes/Dispatcher.class.js');
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');


var dispatcher = new Dispatcher("Login");
var assert     = new Assert(dispatcher);

exports.execute = () => Promises.chaining([
    DriverMod = require( '../../classes/DriverBox.class.js').getDriver(),
    () => dispatcher.Executing(),
    DriverMod.get(config.LOGIN_PAGE),
    DriverMod.WaitForElement('xpath', "// input [ @type = 'email']"),
    DriverMod.EnterTo('xpath', "// input [ @type = 'email']", config.USER_EMAIL_LOGIN.toString()),
    DriverMod.EnterTo('xpath', "// input [ @type = 'password']", config.USER_PASSWORD.toString()),
    DriverMod.ClickOn('xpath', "// input [ @type = 'submit']"),
    DriverMod.waitTransferToNewPageFrom(config.LOGIN_PAGE),
    DriverMod.WaitForElement('xpath',  "// button [ @ng-click = 'create()']"),
    () => dispatcher.Completed()
  ])
