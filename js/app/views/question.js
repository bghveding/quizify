define(['jquery', 'text!app/templates/question.html'], function($, questionTemplate) {
	return Backbone.View.extend({

		events: {
			"click .alternatives li": "pickAlternative",
			"click #next": "nextQuestion",
		},

		initialize: function() {
			this.template = _.template(questionTemplate);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));

			return this;
		},

		// @todo: Move some of this logic into model and proper templating
		pickAlternative: function(e) {
			var questionIndex = parseInt($(e.target).data('alternativeIdx')),
				output = '';

			if(this.model.get("alternatives")[questionIndex].correct)
			{
				this.trigger('answer');
				output += '<span class="label label-success">Correct!</span> The answer is <strong>';
				output += this.model.get("alternatives")[questionIndex].label + '</strong>.';
			}
			else
			{
				var correct = _.find(this.model.get("alternatives"), function(alternative) { return alternative.correct == true; });
				output += '<span class="label label-important">Wrong :(</span> The correct answer was <strong>';
				output += correct.label + '</strong>.';
			}

			output += '<br /><br /><button class="sp-button" id="next">Next question</button>';
			this.$el.html(output);
		},

		nextQuestion: function(e) {
			this.trigger("next");
		}
	});
});