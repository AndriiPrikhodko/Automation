var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var remote            = require('selenium-webdriver/remote');
var Promises          = require('../helpers/promiseHelper');
var selection         = require('../helpers/smartSelectionHelper');

var dispatcher        = new Dispatcher( "action -> insert image" );
var assert            = new Assert(dispatcher);

exports.execute = function(picture){
  var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
  return Promises.chaining([
                          function(){dispatcher.Executing()},
                          DriverMod.setFileDetector(new remote.FileDetector),
                          selection.execute(DriverMod),
                          DriverMod.ClickOn('xpath',  "// button [ @data-type = 'image' ]"),
                          DriverMod.WaitForElement('xpath',  "// h3 [ contains (.,'Upload image') ]"),
                          DriverMod.ClickOn('id',  "image-upload-btn"),
                          DriverMod.sendToElement(DriverMod.FindElement('id',  "image-upload-btn"), picture.path),
                          // DriverMod.ClickOn('xpath', "// button [ contains (.,'Save') ]"),
                          // DriverMod.WaitForElementRemoved( 'id' ,  "image-upload-btn" ),
                          function(){dispatcher.Completed()}
                          ])
}
