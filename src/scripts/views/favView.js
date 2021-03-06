import React from "react"
import Header from "./header.js"
import STORE from "../store"
import ACTIONS from "../actions"

var FavView = React.createClass({
	componentWillMount: function() {
		STORE.on("storeChanged", ()=> {
			this.setState(STORE._getData())
		})
		ACTIONS.fetchFavorites()
	},
	getInitialState: function() {
		return STORE._getData()
	},
	componentWillUnmount: function() {
		STORE.off("storeChanged")
	},
	render: function() {
		return (
			<div className="fav-view">
				<Header />
				<ListingsContainer collection={this.state.favCollection}/>
			</div>
		)
	}
})

var ListingsContainer = React.createClass({
	_checkForListings: function() {
		console.log(this.props.collection.length)
		if(this.props.collection.length < 1) return <h2>No Favorites Found</h2>
	},
	_makeListings: function(mod) {
		console.log("HELLO",mod)
		if(mod) {
			return <Listing model={mod} key={mod.cid} />
		}
	},
	render: function() {
		return (
			<div className="listings-container">
				{this._checkForListings()}
				{this.props.collection.map(this._makeListings)}
			</div>
		)
	}
})

var Listing = React.createClass({
	_getListingImage: function(model) {
		console.log(model)
		if(model.get("MainImage").hasOwnProperty("url_170x135")) {
			return model.get("MainImage").url_170x135
		} else {
			return "../../imgs/defaultPic.jpg"
		}
	},
	_handleFavoriteClick: function() {
		ACTIONS.deleteFavorite(this.props.model)
	},
	render: function() {
		var materialIconStyle = this.props.model.get('favorite') === true ? "favorite" : "favorite_border"
		var model = this.props.model
		return (
			<div className="listing">
				<a href={"#details/" + model.get("listing_id")}>
					<img src={this._getListingImage(model)} />
				</a>
				<p className="favorite material-icons" onClick={this._handleFavoriteClick}>{materialIconStyle}</p>
				<div className="listing-details">
					<p>{model.get("title").slice(0,25) + "..."}</p>
					<div className="details">
						<span>{model.get("Shop").shop_name}</span>
						<span>{"$" + model.get("price")}</span>
					</div>
				</div>
			</div>
		)
	}
})

export default FavView