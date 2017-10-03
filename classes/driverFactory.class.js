var webdriver = require('selenium-webdriver');
var chrome    = require('selenium-webdriver/chrome');
var path      = require('chromedriver').path;

module.exports = {
   getChromeDriver : () => createChromeDriver(),
}

createChromeDriver = function(){
 return driver = new webdriver.Builder()
                                       .withCapabilities(webdriver.Capabilities.chrome())
                                       .build();
}
