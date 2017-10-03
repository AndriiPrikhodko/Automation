var ReportIO  = require( "./ReportIO.js" );

function dispatcher(name){
  this.name = name;
  this.msg  = "default msg";
  this.counter = setDefaultCounter();
}

setDefaultCounter = function(){
  return { "successes" : 0 , "failures" : 0};
}

dispatcher.prototype.SetMessage = function(msg){
  this.msg = msg;
  return this;
}

dispatcher.prototype.Executing = function(){
  console.log( this.name + " : " + "Executing..." );
  ReportIO.openReport(this.name);
}

dispatcher.prototype.Completed = function(){
  console.log( this.name + " : " + "Completed." );
  (this.counter.successes + this.counter.failures) ? this.Report() : this.SuiteReport();
  this.counter = setDefaultCounter();
}


dispatcher.prototype.PostfixMessage = function(){
  console.log( this.name + " : " + this.msg );
}

dispatcher.prototype.PrefixMessage = function(){
  console.log( this.msg + " : " + this.name );
}

dispatcher.prototype.AssertSuccess = function(){
  console.log( this.name + " : " + "Assert " + this.msg.substring(0,100) + " -> " + "\x1b[32m" + "success" + "\x1b[0m" );
  this.counter.successes += 1;
}

dispatcher.prototype.AssertFailure = function(){
  console.log( this.name + " : " + "Assert " + this.msg.substring(0,100) + " -> " + "\x1b[31m" + "failure" + "\x1b[0m" );
  this.counter.failures += 1;
}

dispatcher.prototype.Report = function(){

  ReportIO.closeCaseReport(this.counter);

  separateLine();
  console.log( "Total asserts" + " : "  + (this.counter.successes + this.counter.failures) );
  console.log( "Succeeded" + " : " + "\x1b[32m" + this.counter.successes + "\x1b[0m" );
  console.log( "Failed" + " : " + "\x1b[31m" + this.counter.failures + "\x1b[0m" );
  console.log('\n');
}

dispatcher.prototype.SuiteReport = function(){
  ReportIO.closeSuiteReport();
  separateLine();
  console.log('\n');
}

separateLine = function(){
  console.log( "--------------------------------------------------------" );
}

module.exports = dispatcher;
