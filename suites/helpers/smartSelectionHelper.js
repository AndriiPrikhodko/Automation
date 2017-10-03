var webdriver         = require( 'selenium-webdriver' );
var insertWeblink     = require( '../cases/insertWeblink.js' );
var insertFootnote    = require( '../cases/insertFootnote.js' );
var Promises          = require('./promiseHelper');
var By                = require( 'selenium-webdriver' ).By;
var R                 = require('ramda');

exports.execute =  function(){
  var DriverMod         = require( '../../classes/DriverBox.class.js').getDriver();
  return Promises.chaining([
                            function(){return DriverMod.FindAllElements('css', "div.smashdoc-element")},
                            function(webElements){return webElements[webElements.length - 1]},
                            function(last_section){
                                DriverMod.scrollToElement(last_section);
                                return last_section;
                            },
                            function(last_section){selectSection(last_section)}
                            ])
}

function selectSection(last_section){
 return last_section.findElements(By.css("div[ contenteditable = 'true' ]"))
        .then(function(inner_section){ inner_section.length ? selectText(inner_section[0]) : last_section.click()});
}

function selectText(inner_section){
    var DriverMod         = require( '../../classes/DriverBox.class.js').getDriver();
    return inner_section.getSize()
          .then(function(elemntSize){return { "x" : elemntSize.width-1 , "y" : elemntSize.height-1}})
          .then(function(offset){DriverMod.ClickElementAtCoordinats(inner_section, offset)})
}
