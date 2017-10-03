var DriverBox = {
  DriverMod:'',

  storeDriver: function(driver) {
      this.DriverMod = driver;
      return this;
  },

  getDriver: function() {
      return this.DriverMod;
  }
}

module.exports = DriverBox;
