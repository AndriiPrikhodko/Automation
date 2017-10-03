var createSection     = require( './sectionCreate.js' );
var insertTextDraft   = require( './insertText.js' );
var insertImageDraft  = require( './insertImageDraft.js' );
var Dispatcher        = require( '../../classes/Dispatcher.class.js' );
var Assert            = require( '../../classes/Assert.class.js' );
var Promises          = require('../helpers/promiseHelper');
var dispatcher        = new Dispatcher( "Content saved" );
var assert            = new Assert(dispatcher);
var R = require('ramda');

var mapIndexed = R.addIndex(R.map);

asserSectionsContent = (sd_sections, sections, offset) =>   mapIndexed(
                                              function(sd_section,index){
                                              if( index >= offset && sections[index-offset].type == "text") Promises.chaining([
                                              sd_sections[index].getText(),
                                              actual_content => assert.Equals(actual_content, sections[index-offset].expected_content, "section " + (index+1) + " " + sections[index-offset].expected_content)
                                            ])}
                                          )(sd_sections)

exports.execute = function(sections, offset = 0){
  var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
  return Promises.chaining([() =>dispatcher.Executing(),
                            DriverMod.navigate().refresh(),
                            DriverMod.WaitForElement('css', ".documents-loading"),
                            DriverMod.WaitForElementRemoved('css', ".documents-loading"),
                            DriverMod.FindAllElements("css", "div.smashdoc-element"),
                            sd_sections => asserSectionsContent(sd_sections, sections, offset),
                            () => dispatcher.Completed()
                          ])
}
