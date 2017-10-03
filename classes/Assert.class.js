function Assert(dispatcher){
  this.dispatcher = dispatcher;
}

Assert.prototype.validate = function( value , msg ){

  value ? this.dispatcher.SetMessage(msg).AssertSuccess() : this.dispatcher.SetMessage(msg).AssertFailure();
}

Assert.prototype.Equals = function( value1 , value2 , msg ){
  this.validate ( value1 == value2 , msg );
}

Assert.prototype.notEquals = function( value1 , value2, msg ){
  this.validate ( value1 != value2 , msg );
}

module.exports = Assert;
