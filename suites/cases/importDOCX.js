var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var remote            = require('selenium-webdriver/remote');
var Promises          = require('../helpers/promiseHelper');

var dispatcher = new Dispatcher("Import .DOCX");
var assert     = new Assert(dispatcher);

exports.execute = function(){
 var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
 return  Promises.chaining([
          () => dispatcher.Executing(),
          DriverMod.getCurrentUrl(),
          url => assert.Equals(url, config.MY_DOC_PAGE, "current page " + config.MY_DOC_PAGE),
          DriverMod.WaitForElementVisible ('xpath',  "// button [ @ng-click = 'create()' ]"),
          DriverMod.ClickOn               ('xpath',  "// button [ @ng-click = 'create()' ]"),
          DriverMod.WaitForElementVisible ('xpath',  "// img [ @ng-src = '../img/word.png' ]"),
          DriverMod.ClickOn               ('xpath',  "// img [ @ng-src = '../img/word.png' ]"),
          DriverMod.WaitForElement        ('id',  "import_upload_file"),
          DriverMod.setFileDetector       (new remote.FileDetector),
          DriverMod.EnterTo               ('id',  "import_upload_file", config.FILE_PATH),
          DriverMod.WaitForElementVisible ('xpath',  "// button [ @ng-click = 'create()' ]"),
          DriverMod.ClickOn               ('xpath',  "// button [ @ng-click = 'create()' ]"),
          DriverMod.WaitForElement        ('xpath',  "// input [ @value = 'Save document' ]"),
          DriverMod.ClickOn               ('xpath',  "// input [ @value = 'Save document' ]"),
          DriverMod.ClickOn               ('xpath',  "// input [ @value = 'Save document' ]"),
          DriverMod.WaitForElement        ('xpath',  "// a [contains (.,'Open document')]"),
          DriverMod.ClickOn               ('xpath',  "// a [contains (.,'Open document')]"),
          DriverMod.waitForNewWindowNumber(2),
          DriverMod.getAllWindowHandles(),
          windows => DriverMod.getWindow(windows[1]),
          DriverMod.getCurrentUrl(),
          url => assert.Equals(url.indexOf(config.DOCUMENT_PAGE),  0, "current page " + config.DOCUMENT_PAGE + "<doc_uuid>"),
          () => dispatcher.Completed()
    ])
}
