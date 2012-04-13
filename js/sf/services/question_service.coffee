define ["jquery"], ($) -> 
	class QuestionService
		constructor: (@collection) ->
			@models = sp.require('sp://import/scripts/api/models')

		currentTrack: ->
			this.listArtistAlbums()
			this.currentYear()

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

		#@todo: Get albums from last.fm or something. Spotify only lists playable albums
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