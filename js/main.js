require(["jquery", 
	"order!underscore-min", 
	"order!underscore.string",
	"order!backbone", 
	"order!backbone.localStorage", 
	"order!sf/application"], function($, tmp, ustring, tmp2, tmp3, appRouter) {
    
    _.str = ustring;
    
    new appRouter;

    $(function() {
        Backbone.history.start();
    });
});