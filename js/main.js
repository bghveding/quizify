require(
	[
		"require",
		"jquery", 
		"order!underscore.string",
		"order!underscore-min", 
		"order!backbone", 
		"order!backbone.localStorage",
	], 
	function(require, $, ustring) {
    
    _.str = ustring;
    
    require(["sf/application"], function(appRouter) {
	    new appRouter;

	    $(function() {
	        Backbone.history.start();
	    });
    })
	});