import React from "react"
import Header from "./header.js"
import STORE from "../store"
import ACTIONS from "../actions"

var ListView = React.createClass({
	componentWillMount: function() {
		STORE.on("storeChanged", ()=> {
			this.setState(STORE._getData())
		})
		ACTIONS.fetchListings()
	},
	getInitialState: function() {
		return STORE._getData()
	},
	componentWillUnmount: function() {
		STORE.off("storeChanged")
	},
	render: function() {
		return (
			<div className="list-view">
				<Header />
				<ListingsContainer collection={this.state.etsyCollection}/>
			</div>
		)
	}
})

var ListingsContainer = React.createClass({
	_makeListings: function(mod) {
		if(mod) {
			return <Listing model={mod} key={mod.cid} />
		} else {
			return <h2>No Listings Found</h2>
		}
	},
	render: function() {
		return (
			<div className="listings-container">
				{this.props.collection.map(this._makeListings)}
			</div>
		)
	}
})

var Listing = React.createClass({
	_getListingImage: function(model) {
		if(model.get("MainImage").url_170x135) {
			return model.get("MainImage").url_170x135
		} else {
			return "../../imgs/defaultPic.jpg"
		}
	},
	_handleFavoriteClick: function() {
		ACTIONS.toggleFavorite(this.props.model.cid)
		ACTIONS.addFavorite(this.props.model)
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

export default ListView