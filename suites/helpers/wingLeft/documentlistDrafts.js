var shareAll     = require('../../cases/draftListShareAll');
var shareSection = require('../../cases/draftListShareSection');
var openList     = require('../../cases/draftListopen');

listDrafts = function(){}

listDrafts.prototype.openList = () => openList;

listDrafts.prototype.shareAll = () => shareAll;

listDrafts.prototype.shareSection = () => shareSection;

module.exports = listDrafts;
