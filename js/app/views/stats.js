define(['jquery', 'text!app/templates/stats.html'], function($, statsTemplate) {
	return Backbone.View.extend({
		template: _.template(statsTemplate),
		points: 0,
		level: 1,
		levels: [
			50,
			100,
			150,
			230,
			350,
			500,
		],

		initialize: function() {
			this.calculateLevel();
			this.render();
		},

		render: function() {
			this.$el.html(this.template({ points: this.points, level: this.level }));

			return this;
		},

		calculateLevel: function() {
			var progress, level, cap, diff;
			
			cap = this.levels[this.level-1];

			if(this.points >= cap) {
				this.level++;
				cap = this.levels[this.level -1];
				this.points = 0;
			}

			progress = Math.round((this.points / cap) * 100);
			this.$('.progress .bar').css({ 'width' : progress +'%' });
		},

		updatePoints: function(points) {
			this.points += points;
			this.calculateLevel();
			this.$('.level').text(this.level);
		}
	});
});