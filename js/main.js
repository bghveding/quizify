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
	function(require, $, _str) {
    
    _.str = _str;
    
    require(["app/application"], function(appRouter) {
	    new appRouter;

	    $(function() {
	        Backbone.history.start();
	    });
    })
	});