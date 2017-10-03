var documentOptions   = require('./wingLeft/documentOptions');
var Toc               = require('./wingLeft/documentToc');
var Announcements     = require('./wingLeft/documentAnnouncements');
var listChanges       = require('./wingLeft/documentlistChanges');
var listDrafts        = require('./wingLeft/documentlistDrafts');
var Conversations     = require('./wingLeft/documentConversations');
var listArchives      = require('./wingLeft/documentlistArchives');
var wingClose         = require('../cases/wingClose');

wingLeft = function(){};

wingLeft.prototype.wingClose = () => wingClose;

wingLeft.prototype.Options = () => new documentOptions;

wingLeft.prototype.Toc = () => new Toc;

wingLeft.prototype.Announcements = () => new Announcements;

wingLeft.prototype.listChanges = () => new listChanges;

wingLeft.prototype.listDrafts = () => new listDrafts;

wingLeft.prototype.Conversations = () => new Conversations;

wingLeft.prototype.listArchives = () => new listArchives;

module.exports = wingLeft;
