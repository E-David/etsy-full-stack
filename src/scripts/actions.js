import STORE from "./store"
import React from 'react'
import Backbone from "backbone"
import {EtsyCollection,EtsyModel,FavModel,FavCollection} from "./models/dataModels"

const ACTIONS = {
	addFavorite: function(model) {
		var favModel = new FavModel(model.attributes)
		favModel.save()
				.done(()=>console.log("save complete",STORE._get("favCollection")))
				.fail(()=>console.log("save failed"))
	},
	fetchFavorites: function() {
		var f = new FavCollection()
		console.log("BEFORE FETCH",f)
		// we need to tell this collection to fetch data
		f.fetch().then(
			function(){
				console.log("AFTER FETCH SUCCESS",f)
				STORE._set({
					favCollection: f
				})
			},
			function(err) {
				console.log("AFTER FETCH FAIL",f)
				alert('problem retrieving fave data')
				console.log(err)
			}
		)
		// once the data is loaded, we will set a new faveCollection property on our store,
		// which will trigger a full reflow of the view
	},
	fetchListings: function(query) {
		var coll = STORE._get('etsyCollection')
		coll.fetch({
			dataType: 'jsonp',
			data: {
			   	"api_key": coll._apiKey,
			    "includes": "MainImage,Shop",
			    "tags": query
		    }
		}).then(function(){
			STORE._set({
				etsyCollection: coll
			})
		})
	},
	search: function(inputQuery) {
		location.hash = "search/" + inputQuery
		ACTIONS.fetchListings(inputQuery)
	},
	toggleFavorite: function(cid) {
		var coll = STORE._get("etsyCollection"),
			mod = coll.get(cid)

		mod.set({
			favorite: mod.get("favorite") ? false : true
		})
		STORE._set("etsyCollection", coll)
	}

}

export default ACTIONS