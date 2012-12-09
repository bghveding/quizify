define(['jquery', 'app/views/home', 'backbone', 'cs!lib/view_container'], 
	function($, HomeView, Backbone, ViewContainer){

	var appRouter = Backbone.Router.extend({
	
		routes: {
			"": "home",
		},

		initialize: function() {
			this.appView = new ViewContainer('#main-content');
			sp.core.addEventListener('argumentsChanged', this.onArgsChange);
		},

		onArgsChange: function(params) {
			console.log(sp.core.getArguments());
		},

		home: function() {
			this.appView.showView(new HomeView);
		}
	});

	return appRouter;
});