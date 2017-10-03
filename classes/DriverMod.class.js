/*
*   class DriverMod is a wraper of selenium driver
*/
var webdriver       = require( 'selenium-webdriver' );
var By              = require( 'selenium-webdriver' ).By;
var until           = require( 'selenium-webdriver' ).until;
var config          = require( '../config' );
var driverFactory	  = require('./driverFactory.class.js');
var Key             = webdriver.Key;

module.exports = function(){

function DriverMod(){}

DriverMod.prototype = driverFactory.getChromeDriver();
DriverMod.prototype.constructor = DriverMod;

// get element
DriverMod.prototype.FindElement = function(type, selector){
  switch(type){
    case 'id':
      return this.findElement(By.id(selector)) ;
    case 'xpath':
      return this.findElement(By.xpath(selector)) ;
    case 'css':
      return this.findElement(By.css(selector)) ;
  }
}

DriverMod.prototype.FindAllElements = function(type, selector){
  switch(type){
    case 'id':
      return this.findElements(By.id(selector)) ;
    case 'xpath':
      return this.findElements(By.xpath(selector)) ;
    case 'css':
      return this.findElements(By.css(selector)) ;
  }
}

// interactions
DriverMod.prototype.ClickOn = function(type, selector){

  return this.FindElement(type, selector).click();
}

DriverMod.prototype.rightClickOn = function(webElement){

  return this.actions()
                    .click(webElement, webdriver.Button.RIGHT)
                    .perform();
}


DriverMod.prototype.EnterTo = function(type, selector, msg){

  return this.FindElement(type, selector).sendKeys(msg);
}

// locate target
DriverMod.prototype.getWindow = function(target_window){

   this.switchTo().window(target_window);
}

// waiters
DriverMod.prototype.WaitForElement = function(type, selector){
  switch (type){
    case 'id':
      return this.wait(until.elementsLocated({ "id" : selector }), config.WAITER_TIME) ;
    case 'xpath':
      return this.wait(until.elementsLocated({ "xpath" : selector }), config.WAITER_TIME) ;
    case 'css':
      return this.wait(until.elementsLocated({ "css" : selector }), config.WAITER_TIME) ;
  }
}

DriverMod.prototype.waitTransferToNewPageFrom = function(current_url){

  var self = this;

  return  this.wait(function() {
    return self.getCurrentUrl().then(function(url) {
      if( url != current_url ){
            return url;
      };
    });
  }, config.WAITER_TIME);
}

DriverMod.prototype.waitForNewWindowNumber = function(num_window){

  var self = this;

  return  this.wait(function() {
    return self.getAllWindowHandles().then(function(windows) {
      if( windows.length == num_window ){
            return windows;
      };
    });
  }, config.WAITER_TIME);
}

DriverMod.prototype.waitUntilWindowSizeChanged = function(){

  var size = this.manage().window().getSize();
  return  this.wait(function() {
    return this.manage().window().getSize().then(function(current_size) {
      if( size != current_size){
            return true;
      };
    });
  }, config.WAITER_TIME);
}

DriverMod.prototype.WaitForElementVisible = function(type, selector){
    return this.wait(until.elementIsVisible(this.FindElement(type, selector)), config.WAITER_TIME);
}

DriverMod.prototype.waitWebelementAppear = function(webElement){
    return this.wait(until.elementIsVisible(webElement), config.WAITER_TIME);
}

DriverMod.prototype.WaitForElementRemoved = function(type , selector, length = 0){

  var self = this;
  var length;
  this.FindAllElements(type ,selector).then(webElements => length = webElements.length);
  return this.wait(function() {
        return self.FindAllElements( type , selector ).then(function( webElements ) {
          if(webElements.length < length || webElements.length == 0){
            return true;
          }
        });
      }, config.WAITER_TIME);
}

DriverMod.prototype.WaitForElementHidden = function( type , selector ){
      return this.wait(until.elementIsNotVisible( this.FindElement( type , selector ) ), config.WAITER_TIME);
}

DriverMod.prototype.WaitForElementEnabled = function(webElement){
    return this.wait(function(){
                  if(webElement.isEnabled()) return true;
              }, config.WAITER_TIME);
}

DriverMod.prototype.WaitStalenessOf = function( webElement ){
      return this.wait(until.stalenessOf( webElement ), config.WAITER_TIME);
}

DriverMod.prototype.WaitForAlert = function(){

      return this.wait(until.alertIsPresent(), config.WAITER_TIME);
}

DriverMod.prototype.WaitForFrame = function(frame, webElement){

      return this.wait(until.ableToSwitchToFrame(frame, webElement), config.WAITER_TIME);
}

DriverMod.prototype.waitForAttrAssigned = function(webElement, name, value){

  var self = this;

  return this.wait(function(){
      return  webElement.getAttribute(name)
        .then(function(val){
          if(value == val) return true;
        })
      }, config.WAITER_TIME);
}

DriverMod.prototype.waitForInnerHTML = function(webElement, value){

  var self = this;

  return this.wait(function(){
      return  self.getInnerHTML(webElement)
        .then(function(val){
          if(value == val) return true;
        })
      }, config.WAITER_TIME);
}

// examine properties
DriverMod.prototype.isElementDisplayed = function( type , selector ){

  return this.FindElement( type , selector ).isDisplayed();
}

DriverMod.prototype.isElementEnabled = function( type , selector ){

  return this.FindElement( type , selector ).isEnabled();
}

// properties manipulations
DriverMod.prototype.setAttributToWebElement = function( webElement , name , value ){
  this.executeScript( "arguments[0].setAttribute(arguments[1], arguments[2]);", webElement, name, value );
}

DriverMod.prototype.getParent = function(webElement, parentNode){
  this.executeScript( "$(arguments[0]).parents(arguments[1]);", webElement, parentNode);
}

DriverMod.prototype.removeCssClasses = function( type , selector ){

  this.setAttributToWebElement(this.FindElement(type, selector) , "class" , " " );
}

DriverMod.prototype.Check = function(type, selector){
  var webElement = this.FindElement(type, selector);
  return this.executeScript( "arguments[0].checked = true;", webElement);
}
// interactions
DriverMod.prototype.scrollToElement = function(webElement){

  this.executeScript( "arguments[0].scrollIntoView()", webElement);
}

DriverMod.prototype.jsClickAtPoint = function(point){

  this.executeScript( "document.elementFromPoint(arguments[0], arguments[1]).click();", point.x, point.y );
}

DriverMod.prototype.jsClickOnElement = function(webElement){
 return this.executeScript("arguments[0].click()", webElement);
}

DriverMod.prototype.getInnerHTML = function(webElement){
   return this.executeScript("return arguments[0].innerHTML;", webElement);
}

DriverMod.prototype.ClickElementAtCoordinats = function(webElement, Offset){
  return  this.actions()
              .mouseMove(webElement, Offset)
              .click()
              .perform();
}

DriverMod.prototype.sendToElement = function(webElement, msg){
  return  this.actions()
              .mouseMove(webElement)
              .sendKeys(msg)
              .perform();
}

DriverMod.prototype.clickAtLocation = function(location){
  return this.actions()
             .mouseMove(location)
             .click()
             .perform();
}

DriverMod.prototype.pressReturn = function(){
  return this.actions()
              .sendKeys(Key.ENTER)
              .perform();
}

DriverMod.prototype.insertTextandEnter = function(webElement, data){

  return this.actions()
                      .click(webElement)
                      .sendKeys(data)
                      .sendKeys(Key.ENTER)
                      .perform();
}

DriverMod.prototype.sendMessage = function(data){

  return this.actions()
                      .sendKeys(data)
                      .perform();
}
return new DriverMod;
}
