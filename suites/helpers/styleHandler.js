var Promises                = require('./promiseHelper');
var applybold               = require( '../cases/styleBold.js' );
var applyitalic             = require( '../cases/styleItalic.js' );
var applyunderline          = require( '../cases/styleUnderline.js' );
var R                       = require('ramda');

exports.execute  = styles => R.compose(Promises.chaining, R.map(style => stylesHandler(style)))(styles);

function stylesHandler(style){
  switch(style){
    case "bold":
      return applybold.execute();
    case "italic":
      return applyitalic.execute();
    case "underline":
      return applyunderline.execute();
    default:
      return true;
  }
}
