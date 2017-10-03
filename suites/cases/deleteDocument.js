var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');
var R                 = require('ramda');

var dispatcher = new Dispatcher("Delete Document");
var assert     = new Assert(dispatcher);

exports.execute = function(){
  return Promises.chaining([
            DriverMod = require( '../../classes/DriverBox.class.js').getDriver(),
            () => dispatcher.Executing(),
            DriverMod.getCurrentUrl(),
            url => assert.Equals(url, config.MY_DOC_PAGE, "current page " + config.MY_DOC_PAGE),
            DriverMod.WaitForElementRemoved('id' ,  "feedback_handler" ),
            DriverMod.WaitForElement('css', "div.hover-actions.ng-scope.ng-isolate-scope"),
            DriverMod.FindAllElements('css', "div.hover-actions.ng-scope.ng-isolate-scope"),
            docs => R.map(doc => moveToTrash(DriverMod, doc))(docs),
            () => dispatcher.Completed()
          ])
}

function moveToTrash(){
  var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
  return Promises.chaining([
    DriverMod.rightClickOn(DriverMod.FindElement('css', "div.hover-actions.ng-scope.ng-isolate-scope")),
    DriverMod.ClickOn('xpath', "// span [contains (.,'Move to trash')]"),
    DriverMod.WaitForElementRemoved('css' ,  "div.hover-actions.ng-scope.ng-isolate-scope"),
    DriverMod.WaitForElementRemoved('xpath' ,  " // div [contains (.,'Successfully trashed document')]")
  ])
}
