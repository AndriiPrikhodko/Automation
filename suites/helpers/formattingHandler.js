var config  	              = require( '../../config' );
var Promises                = require('./promiseHelper');
var simpleHeading           = require( '../cases/formattingSimpleHeading.js' );
var numberedHeading         = require( '../cases/formattingNumberedHeading.js' );
var numberedParagraph       = require( '../cases/formattingNumberedParagraph.js' );
var bulletedList            = require( '../cases/formattingBulletedList.js' );
var numberedList            = require( '../cases/formattingNumberedList.js' );
var paragraph               = require( '../cases/formattingParagraph.js');

exports.execute = function(section){
  var DriverMod         = require( '../../classes/DriverBox.class.js').getDriver();
  return Promises.chaining([
          DriverMod.FindAllElements('css' ,"div.smashdoc-element"),
          sections => sections[sections.length - 1].getAttribute("data-texttype"),
          current_formatting => section.formatting == current_formatting ? true : Promises.chaining([formattingHandler(section), DriverMod.sleep(config.SAVE_TIME)]),
        ]);
}

function formattingHandler(section){
  switch(section.formatting){
    case "heading":
      return simpleHeading.execute(section.level);
    case "heading-ol":
      return numberedHeading.execute(section.level);
    case "paragraph-ol":
      return numberedParagraph.execute(section.level);
    case "list":
      return bulletedList.execute();
    case "list-ol":
      return numberedList.execute();
    case "paragraph":
      return paragraph.execute();
    default:
      return true;
  }
}
