# Taps into different APIs for music info.
# @todo: Add a "type in members of band" questio. Could use musicbrainz API here.
define ["jquery"], ($) -> 
  class QuestionService
    constructor: (@collection) ->
      @models = sp.require('sp://import/scripts/api/models')

    currentTrack: ->
      this.listArtistAlbums()
      this.currentYear()

    # Question about current track's year
    currentYear: ->
      track = @models.player.track
      albumYear = track.album.year

      @collection.add({ 
        question: "What year is the current track from?",
        alternatives: _.shuffle [
          {label: albumYear, correct: true},
          {label: albumYear-1 },
          {label: albumYear-2 },
          ]})

    # Gets albums of currently playing artist.
    # @todo: Create a consistent alternatives structure.
    listArtistAlbums: ->
      track = @models.player.track
      artist = track.artists[0]
      url = "http://ws.spotify.com/lookup/1/.json?uri=#{artist.uri}&extras=album"

      return $.get url, (data) => 
        @collection.add({ 
          question: "List as many albums as you can:",
          type: "text",
          alternatives: data.artist.albums
        })