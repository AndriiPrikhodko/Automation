var config                = require('../config');
var docDraft 	            = require('../provisions/articles/article1').DOCUMENT;
var docReview 	          = require('../provisions/articles/article2').DOCUMENT;

var driver                = require('../classes/DriverMod.class');
var dispatcher            = require('../classes/Dispatcher.class');
var Promises              = require('./helpers/promiseHelper');
var DriverBox             = require('../classes/DriverBox.class');

var login 		            = require('./cases/login');
var acceptAll 		        = require('./cases/changesAcceptAll');
var declineAll 		        = require('./cases/changesDeclineAll');
var documentCreate        = require('./cases/documentCreate');
var documentBuilder       = require('./helpers/documentBuilder');
var createSection 		    = require('./cases/sectionCreate');
var documentShare         = require('./cases/documentShare');
var assertSectionsSaved   = require('./cases/assertSectionsSaved');
var wingLeft              = require('./helpers/wingLeft');

dispatcher = new dispatcher("Suite2");
wingLeft = new wingLeft();

function execute(){
  return Promises.chaining([
            () => DriverMod = DriverBox.storeDriver(new driver).getDriver(),
            () => dispatcher.SetMessage("Login, createDraftDocument, insertTextDraft, setToReview").PostfixMessage(),
            () => dispatcher.Executing(),
            () => DriverMod.manage().window().maximize(),
            () => login.execute(),
            () => documentCreate.execute(docDraft.meta),
            () => documentBuilder.execute(docDraft.sections),
            () => assertSectionsSaved.execute(docDraft.sections),
            () => createSection.execute(),
            () => documentShare.execute(config.USER_EMAIL_REGISTER),
            () => documentBuilder.execute(docReview.sections),
            () => assertSectionsSaved.execute(docReview.sections, docDraft.sections.length),
            () => wingLeft.listDrafts().openList().execute(),
            () => wingLeft.listDrafts().shareSection().execute(2),
            () => wingLeft.listDrafts().shareAll().execute(),
            () => wingLeft.listChanges().openList().execute(),
            () => wingLeft.listChanges().decideSection().execute(3),
            () => wingLeft.wingClose().execute(),
            () => acceptAll.execute(),
            () => DriverMod.quit(),
            () => dispatcher.Completed()
          ])
}

if(!config.USE_AUTORUN) execute();
else dispatcher.SetMessage("Autorun").PrefixMessage();

module.exports.execute = execute;
