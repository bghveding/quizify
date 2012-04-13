define(['jquery', 'sf/views/home'], function($, HomeView){

	Backbone.View.prototype.close = function(){
	  this.remove();
	  this.unbind();
	  if (this.onClose){
	    this.onClose();
	  }
	}

	var AppView = {};
	AppView.showView = function(view) {
	 	if (this.currentView){
	      this.currentView.close();
	    }

	    this.currentView = view;
	    this.currentView.render();

	    $("#main-content").html(this.currentView.el);
	}

	var appRouter = Backbone.Router.extend({
	
		routes: {
			"": "home",
		},

		initialize: function() {
			this.appView = AppView;
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