require(
	[
		"require",
		"jquery", 
		"underscore.string",
		"underscore", 
		"backbone", 
		"vendor/bootstrap.min", 
		"vendor/backbone.localStorage",
	], 
	function(require, $, _str, underscore, Backbone) {
    
    Backbone.View.prototype.close = function(){
      this.remove();
      this.unbind();
      if (this.onClose){
        this.onClose();
      }
    }
    
    _.str = _str;
    
    require(["app/application"], function(appRouter) {
	    new appRouter;

	    $(function() {
	        Backbone.history.start();
	    });
    })
	});