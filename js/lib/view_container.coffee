# Taps into different APIs for music info.
# @todo: Add a "type in members of band" questio. Could use musicbrainz API here.
define ["jquery"], ($) -> 
  class ViewContainer
    constructor: (@target) ->
      this.$targetEl = $(@target)

    showView: (view) ->
      if @currentView? then @currentView.close()

      @currentView = view

      this.$targetEl.html(this.currentView.el);