import React from "react"
import ReactDOM from "react-dom"
import Backbone from "backbone"
import ListView from "./views/listView.js"
import DetailView from "./views/detailView.js"
import FavView from "./views/favView.js"

var app = function() {
	var FavRouter = Backbone.Router.extend({
		routes: {
			"home": "handleHome",
			"search/:query": "handleSearch",
			"details/:listingId": "handleDetails",
			"favorites": "handleFavorites",
			"*default": "redirect"
		},
		handleHome: function() {
			ReactDOM.render(<ListView />, document.querySelector(".container"))
		},
		handleSearch: function(query) {
			ReactDOM.render(<ListView query={query} />, document.querySelector(".container"))
		},
		// handleDetails: function(_listingId){
		// 	var etsyModel = new EtsyModel()
		// 	etsyModel._listingId = _listingId

		// 	// showGif()
		// 	etsyModel.fetch({
		// 	    dataType: 'jsonp',
		// 	    data: {
		// 	    	"api_key": etsyModel._apiKey,
		// 	    	"includes": "MainImage,Shop"
		// 	    }
		//     }).then(function(){
		//     	ReactDOM.render(<DetailView model={etsyModel} />, document.querySelector(".container"))
		// 	})
		// },
		handleFavorites: function() {
			ReactDOM.render(<FavView />, document.querySelector(".container"))
		},
		redirect: function() {
			location.hash = "home"
			// showGif()
		},
		initialize: function(){
			Backbone.history.start()
		}
	})
	new FavRouter()
}
app()