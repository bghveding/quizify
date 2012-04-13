define(["jquery", 
		"text!sf/templates/home.html", 
		'cs!sf/services/question_service',
		"sf/collections/question_collection", 
		"sf/views/stats", 
		"sf/views/question",
		"sf/views/text_question"], 
		function($, homeTemplate, QuestionService, QuestionCollection, StatsView, QuestionView, TextQuestionView) {
			return Backbone.View.extend({

				template: _.template(homeTemplate),

				initialize: function() {
					_.bindAll(this, 'render', 'addQuestion', 'changeSong', 
							'updatePoints', 'nextQuestion');

					var models = sp.require('sp://import/scripts/api/models');
					models.player.observe(models.EVENT.CHANGE, this.changeSong);

					this.questionCollection = new QuestionCollection;
					this.createQuiz();
				},

				// Generates quiz questions
				createQuiz: function() {
					this.questionCollection.reset();
					var qService = new QuestionService(this.questionCollection);
					$.when( qService.currentTrack() )
					.then(function() {
						console.log("Quiz generated.");
					});
				},

				// Event to be called when player changes
				// Creates a new quiz if there's a change of context(new album).
				// @todo: if artist != previous, generate new quiz. Should let user finish last question?
				changeSong: function(event) {
					if (event.data.curcontext == true) {
						this.questionView.close();
						
						this.createQuiz();
						this.addQuestion();
					}
				},

				render: function() {
					this.$el.html(homeTemplate);
					this.questionEl = this.$('.question');
					this.statsView = new StatsView({ el: this.$(".stats") });
					
					this.addQuestion();

					return this;
				},

				// @todo: Decide on point system.
				updatePoints: function() {
					this.statsView.updatePoints(10);
				},

				// @todo: Proper no-more-questions-screen or some alternative.
				nextQuestion: function() {
					if(this.addQuestion() === false) {
						this.questionView.close();
						this.questionEl.html('There are no more questions :(');
					}
				},

				// Grabs a new question from collection, creates a new view
				// and renders it in the main window.
				addQuestion: function() {
					var question = this.questionCollection.pop(),
						questionView;

					if( ! question) return false;

					switch( question.get("type") )
					{
						case "text":
							questionView = new TextQuestionView({ model: question });
							break;
						default:
							questionView = new QuestionView({ model: question });
					}

					questionView.bind('answer', this.updatePoints);
					questionView.bind('next', this.nextQuestion);
					this.questionEl.html(questionView.render().el);

					this.questionView = questionView;
				}
		});
});