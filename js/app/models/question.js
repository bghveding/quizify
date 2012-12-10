define(["jquery"], function() {
  return Backbone.Model.extend({
    
    isCorrectTextAnswer: function(answer) {
      var isCorrect = _.find(this.get("alternatives"), function(alternative) {
        return alternative.album.name.toLowerCase() == _.str.trim(answer).toLowerCase();
      });

      return isCorrect;
    }
  });
});