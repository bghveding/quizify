define(["jquery", "app/models/question"], function($, Question) {

	return Backbone.Collection.extend({
		model: Question,

		pop: function(options) {
	      var model = this.at(this.length - 1);
	      this.remove(model, options);
	      return model;
	    },
	});
});