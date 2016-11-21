import Backbone from "backbone"
import _ from "underscore"
import {EtsyCollection,FavCollection} from "./models/dataModels"

const STORE = _.extend(Backbone.Events,{
	_data: {
		etsyCollection: new EtsyCollection(),
		favCollection: new FavCollection()
	},
	_emitChange: function() {
		this.trigger("storeChanged")
	},
	_get: function(prop) {
		return this._data[prop]
	},
	_getData: function() {
		return this._data
	},
	_set: function(input,value) {
		console.log(input,value)
		if(typeof input === "object"){
			var objectInput = input
			this._data = _.extend(this._data,objectInput)
		} else {
			var key = input
			this._data[key] = value
		}
		this._emitChange()
	}
})

export default STORE