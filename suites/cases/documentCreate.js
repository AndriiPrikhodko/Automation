var config  	        = require( '../../config' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');
var R                 = require('ramda');
var dispatcher        = new Dispatcher("Create document");
var assert            = new Assert(dispatcher);

exports.execute = meta => Promises.chaining([
        DriverMod  = require( '../../classes/DriverBox.class.js').getDriver(),
        () => dispatcher.Executing(),
        DriverMod.getCurrentUrl(),
        url => assert.Equals(url, config.MY_DOC_PAGE , "current page " + config.MY_DOC_PAGE),
        DriverMod.WaitForElementVisible     ('xpath',  "// button [ @ng-click = 'create()' ]"),
        DriverMod.ClickOn                   ('xpath' , "// button [ @ng-click = 'create()' ]"),
        DriverMod.WaitForElementVisible     ('css',  "div.import-icon-create"),
        DriverMod.ClickOn                   ('css',  "div.import-icon-create"),
        DriverMod.WaitForElement            ('xpath',  "// input [ @ng-model = 'model.filename' ]"),
        DriverMod.EnterTo                   ('xpath',  "// input [ @ng-model = 'model.filename' ]", meta.name),
        meta.description ? DriverMod.EnterTo('xpath',  "// textarea [ @ng-model = 'model.description' ]", meta.description) : '',
        meta.tags ?  R.map(tag => DriverMod.insertTextandEnter(DriverMod.FindElement('xpath',  "// input [ @ng-model = 'tag' ]"), tag))(meta.tags) : '',
        DriverMod.ClickOn                   ('xpath',  "// input [ @value = 'Create document' ]"),
        DriverMod.WaitForElement            ('xpath',  "// a [contains (.,'Open document')]"),
        DriverMod.ClickOn                   ('xpath',  "// a [contains (.,'Open document')]"),

        DriverMod.waitForNewWindowNumber(2),
        DriverMod.getAllWindowHandles(),
        windows => DriverMod.getWindow(windows[1]),
        () => DriverMod.WaitForElementVisible('css',  ".documents-loading"),
        () => DriverMod.WaitForElementRemoved('css',  ".documents-loading"),
        () => DriverMod.getCurrentUrl(),
        url => assert.Equals(url.indexOf(config.DOCUMENT_PAGE),  0, "current page " + config.DOCUMENT_PAGE + "<doc_uuid>"),
        () => DriverMod.getInnerHTML(DriverMod.FindElement("css", "span.label")),
        text => assert.Equals( text , config.DOC_TYPES[0] , "document label is " + config.DOC_TYPES[0]),
        () => dispatcher.Completed()
      ])
