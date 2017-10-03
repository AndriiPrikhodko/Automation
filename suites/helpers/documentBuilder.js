var config  	        = require( '../../config' );
var createSection     = require( '../cases/sectionCreate.js' );
var textProcessor     = require( './textProcessor.js' );
var insertImageDraft  = require( '../cases/insertImageDraft.js' );
var insertTableDraft  = require( '../cases/insertTableDraft' );
var Promises          = require('./promiseHelper');
var R                 = require('ramda');

exports.execute = sections =>  Promises.chaining(R.compose(
                                      R.append(function(){sectionHandler(R.takeLast(1,sections)[0])}),
                                      R.reduce((acc, section) => {
                                                                  acc.push(() => sectionHandler(section));
                                                                  acc.push(() => createSection.execute());
                                                                  return acc;
                                                                },[]),
                                      R.slice(0, -1)
                                    )(sections))

function sectionHandler(section){
  switch(section.type){
    case "text":
      return textProcessor.execute(section);
    case "picture":
      return insertImageDraft.execute(section);
    case "table":
      return insertTableDraft.execute(section);
  }
}
