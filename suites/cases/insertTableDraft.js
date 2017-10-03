var config  	        = require('../../config' );
var Dispatcher        = require('../../classes/Dispatcher.class.js' );
var Assert            = require('../../classes/Assert.class.js' );
var tablePopulate     = require('../helpers/tablePopulate.js' );
var selection         = require('../helpers/smartSelectionHelper');
var Promises          = require('../helpers/promiseHelper');

var dispatcher        = new Dispatcher( "action -> insert table" );
var assert            = new Assert(dispatcher);

exports.execute = function(table){
    var DriverMod         = require( '../../classes/DriverBox.class.js').getDriver();
    return Promises.chaining([
                                () => dispatcher.Executing(),
                                selection.execute              (),
                                DriverMod.ClickOn              ('xpath', "// button [ @data-type = 'table' ]"),
                                DriverMod.WaitForElement       ('css', "table.htCore"),
                                tablePopulate.execute          (table),
                                DriverMod.getInnerHTML(DriverMod.FindElement("css", "span.label")),
                                document_label => document_label == config.DOC_TYPES[0] ?
                                DriverMod.ClickOn('xpath', "// button [ contains (.,'Save') ]") :
                                DriverMod.ClickOn('xpath', "// button [ contains (.,'Save as draft') ]"),
                                DriverMod.FindAllElements      ('css', "div.smashdoc-element"),
                                // table inserted in last section previous is deleted
                                DriverMod.FindAllElements('css', "div.smashdoc-element"),
                                SD_sections => SD_sections[SD_sections.length - 2],
                                stale_section => stale_section.getAttribute("id"),
                                stale_section_id => DriverMod.WaitStalenessOf(DriverMod.FindElement("id", stale_section_id)),
                                () => dispatcher.Completed()
          ])
}
