var config  	        = require('../../config');
var webdriver         = require( 'selenium-webdriver' );
var insertWeblink     = require( '../cases/insertWeblink.js' );
var insertFootnote    = require( '../cases/insertFootnote.js' );
var insertCrossRef    = require( '../cases/insertCrossRef.js' );
var Promises          = require('./promiseHelper');
var R                 = require('ramda');

exports.execute =  function(section){
  var DriverMod = require( '../../classes/DriverBox.class.js').getDriver();
  if(section.hasOwnProperty("anchors")){
      next = 0;
      return Promises.chaining([
        R.map( content => content == '@' ?
         anchorHandler(section.anchors[next++]) :
         DriverMod.sendMessage(content))(section.content.split(/(@)/))
       ])
   }
   else return Promises.chaining([
       DriverMod.sendMessage(section.content)
  ]);
}

function anchorHandler(anchor){
    switch(anchor.type) {
      case "weblink":
        return  insertWeblink.execute(anchor);
      case "footnote":
        return  insertFootnote.execute(anchor);
      case "crossRef":
        return  insertCrossRef.execute(anchor);
    }
}
