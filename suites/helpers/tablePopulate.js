var config  	        = require( '../../config' );
var Promises          = require('./promiseHelper');
var R                 = require('ramda');

exports.execute = function(table){
    var DriverMod         = require( '../../classes/DriverBox.class.js').getDriver();
    var mapIndexed = R.addIndex(R.map);
    return  R.compose(
                mapIndexed((row, row_index) => {
                    return mapIndexed((cell, column_index) => {
                        DriverMod.insertTextandEnter(DriverMod.FindElement("css", "table.htCore tr:nth-of-type(" + (row_index + 1 ) + ") td:nth-of-type(" + (column_index + 1) + ")"), cell.toString())
                    },row)
                })
              )(table.content)
}
