var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');
var selection         = require('../helpers/smartSelectionHelper');
var dispatcher        = new Dispatcher( "action -> new section" );
var assert            = new Assert(dispatcher);

var section_num;

exports.execute = function(){
  var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
  return Promises.chaining([
                  () => dispatcher.Executing(),
                  countSections(DriverMod),
                  selection.execute(DriverMod),
                  DriverMod.pressReturn(),
                  DriverMod.FindAllElements('css', "div.smashdoc-element"),
                  SD_sections => assert.Equals(SD_sections.length , section_num + 1 , "new " + (section_num + 1) + " section created " ),
                  () => dispatcher.Completed()
                ])
}

function countSections(){
  var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
  return DriverMod.FindAllElements('css', "div.smashdoc-element")
         .then(function(webElements){ section_num = webElements.length})
}
