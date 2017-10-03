var config  	        = require('../../config');
var Dispatcher        = require('../../classes/Dispatcher.class.js');
var Promises          = require('../helpers/promiseHelper');
var Assert            = require('../../classes/Assert.class.js');
var Indent            = require("../cases/indent.js");
var Outdent           = require("../cases/outdent.js");
var R                 = require('ramda');

exports.execute = function(section_indent){
 var DriverMod               = require( '../../classes/DriverBox.class.js').getDriver();
 return  Promises.chaining([
                         function(){return DriverMod.FindAllElements( 'css' ,  "div.smashdoc-element")},
                         function(webElements){return webElements[ webElements.length - 1 ]},
                         function(webElement){return webElement.getAttribute("data-indent")},
                         function(indent){
                                           if(indent == section_indent) return true;
                                           else if (section_indent - indent > 0) return Promises.chaining([function(){Indent.execute(indent)}, DriverMod.sleep(config.SAVE_TIME)]);
                                           else return Promises.chaining([function(){applyOutdent(indent - section_indent)}, DriverMod.sleep(config.SAVE_TIME)]);
                                         }
                       ]);
}

function applyOutdent(multiplier){
  return R.compose(
                    Promises.chaining,
                    R.reduce((acc, section) => {
                                                acc.push(Outdent.execute());
                                                return acc;
                                              },[]),
                    R.times(R.identity)
                    )(multiplier)
}
