var openList      = require('../../cases/changesListopen');
var decideSection = require('../../cases/changesListDecideSection');

listChanges = function(){};

listChanges.prototype.openList = () => openList;

listChanges.prototype.decideSection = () => decideSection;

module.exports = listChanges;
