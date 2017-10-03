var config  	        = require('../../config' );
var Dispatcher        = require('../../classes/Dispatcher.class.js' );
var Assert            = require('../../classes/Assert.class.js' );
var contentHandler    = require('../helpers/contentHandler.js' );
var selection         = require('../helpers/smartSelectionHelper');
var Promises          = require('../helpers/promiseHelper');

var dispatcher        = new Dispatcher( "action -> insert text" );
var assert            = new Assert(dispatcher);


exports.execute = function(section){
    return Promises.chaining([
                              DriverMod  = require( '../../classes/DriverBox.class.js').getDriver(),
                              () => dispatcher.Executing(),
                              selection.execute(),
                              contentHandler.execute(section),
                              DriverMod.sleep(config.SAVE_TIME),
                              DriverMod.FindElement('css', ".smashdoc-selected-section div.smashdoc-element-text").getText(),
                              text => assert.Equals(text, section.expected_content,"content: " + section.expected_content),
                              () => dispatcher.Completed()
                          ])
}
