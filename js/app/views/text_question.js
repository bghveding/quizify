define(['jquery', 'text!app/templates/question_text.html'], function($, textQuestionTemplate) {
	return Backbone.View.extend({
		timerLength: 35,

		events: {
			"click #next": "nextQuestion",
			"keypress #text-answer": "answerByText",
		},

		initialize: function() {
			this.template = _.template(textQuestionTemplate);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			
			var that = this;
			this.timerEl = this.$('#timer').text(this.timerLength);
			setTimeout(function() { that.startTimer(); console.log("GO!"); }, 3000);

			return this;
		},

		answerByText: function(e) {
			if (e.keyCode != 13) return; 
			
			var $input = $(e.target),
				correct = false;
			
			if(correct = this.model.isCorrectTextAnswer($input.val())) 
			{
				this.trigger('answer');
				this.$('.answers').append('<li class="label-success">' + correct.album.name + '</li>');
			}

			$input.val('');
		},

		startTimer: function() {
			var that = this,
				start = this.timerLength;

			this.timer = setInterval(
				function() { 
					if(start == 0)
					{
						clearInterval(that.timer);
						that.trigger("next");
					}

					start -= 1;
					that.timerEl.text(start);
				}, 
			1000);
		},

		nextQuestion: function(e) {
			this.trigger("next");
		},

		onClose: function() {
			clearInterval(this.timer);
		}
	});
});