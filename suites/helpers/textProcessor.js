var Promises          = require('./promiseHelper');
var applyFormatting   = require('./formattingHandler');
var applyStyle        = require('./styleHandler');
var applyIndent       = require('./indentHandler');
var applyAlignment    = require('./alignmentHandler');
var insertText        = require('../cases/insertText');
var selectSection     = require('./smartSelectionHelper');
var R                 = require('ramda');

var settings_strategy = ["content",
                         "formatting",
                         "alignment",
                         "styles",
                         "indent"]

exports.execute = section => Promises.chaining(R.compose(
                                       R.map(settings => processSettings(section, settings))
                                     )(settings_strategy))

processSettings = function(section, settings){
  section.hasOwnProperty(settings) ? applySettings(section, settings) : defaultSettings(section, settings)
}

function applySettings(section, settings){
  switch(settings){
    case "content":
      return insertText.execute(section);
    case "indent":
      return applyIndent.execute(section.indent);
    case "alignment":
      return applyAlignment.execute(section.alignment);
    case "styles":
      return applyStyle.execute(section.styles);
    case "formatting":
      return applyFormatting.execute(section);
    default:
      return true;
  }
}

function defaultSettings(section, settings){
  switch(settings){
    case "indent":
      return applyIndent.execute(0);
    case "formatting":
      return applyFormatting.execute(section);
    default:
      return true;
  }
}
