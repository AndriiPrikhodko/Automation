var Dispatcher        = require('../../classes/Dispatcher.class.js');
var Assert            = require('../../classes/Assert.class.js');
var Promises          = require('../helpers/promiseHelper');
var dispatcher        = new Dispatcher("action -> checkin section");
var assert            = new Assert(dispatcher);

exports.execute = function(DriverMod){
  return Promises.chaining([
                  () => dispatcher.Executing(),
                  DriverMod.WaitForElementVisible('xpath', ' // div [ @data-event = "checkinDraftSection"]'),
                  DriverMod.ClickOn('xpath', ' // div [ @data-event = "checkinDraftSection"]'),
                  () => dispatcher.Completed()
                ])
}
