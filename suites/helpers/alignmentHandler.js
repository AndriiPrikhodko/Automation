var Promises                = require('./promiseHelper');
var R                       = require('ramda');

var alignRight              = require('../cases/alignmentRight.js' );
var alignCenter             = require('../cases/alignmentCenter.js' );
var alignJustify            = require('../cases/alignmentJustify.js' );

exports.execute = alignment => alignmentHandler(alignment);

function alignmentHandler(alignment){
  switch(alignment){
    case "right":
      return alignRight.execute();
    case "center":
      return alignCenter.execute();
    case "justify":
      return alignJustify.execute();
    case "left":
      return true;
    default:
      return true;
  }
}
