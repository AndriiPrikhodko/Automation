var fs = require ('fs');

var path_to_report = 'tmp/report.json';
var p = 0;
var file_content = '';

inQuotes = function(str){
  return '"' + str + '"';
}

inParentesis = function(str){
  return "{" + str + "}";
}

openJSONobj = function(key){
  (p+1)%2 == 1 ? open_obj = "," + key + ":" : open_obj = "{" + key + ":";
  p = 1;
  return open_obj;
}

setJSONvalue = function( value ){
  p = 0;
  return value;
}

closeJSONobj = function(){
  p = 0;
  return "}";
}

constructReport = function(counter){
  content = openJSONobj(inQuotes("Total")) + setJSONvalue(counter.successes + counter.failures);
  content += openJSONobj(inQuotes("Successes")) + setJSONvalue(counter.successes);
  content += openJSONobj(inQuotes("Failures")) + setJSONvalue(counter.failures);
  return content;
}

exports.closeCaseReport = function( counter ){
  // present data in couneter
  content = constructReport(counter);
  // close case obj
  content += closeJSONobj();
  file_content +=content;
}

exports.closeSuiteReport = function(){
  file_content +=closeJSONobj();
  addToFile(file_content);
  file_content ='';
}

exports.openReport = function( name ){
  file_content +=openJSONobj(inQuotes(name));
}

addToFile = function( content ){

  // fs.stat(path_to_report, function(err, stat) {
  //     if(err == null) {
  //
  //       fs.appendFile( path_to_report , content , function (err) {
  //         if (err) return console.log(err + "append file");
  //       });
  //     } else if(err.code == 'ENOENT') {
  //       content = content.slice(1);
  //       fs.writeFile( path_to_report , content , function (err) {
  //         if (err) return console.log(err + "write file");
  //       });
  //     } else {
  //         console.log('Some other error: ', err.code);
  //     }
  // });
}
