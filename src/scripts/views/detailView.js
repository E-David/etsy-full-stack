import React from "react"
import Header from "./header.js"
import STORE from "../store"
import ACTIONS from "../actions"

var DetailView = React.createClass({
	componentWillMount: function() {
		STORE.on("storeChanged", ()=> {
			this.setState(STORE._getData())
		})
		ACTIONS.fetchListingDetails(this.props.listingId)
	},
	getInitialState: function() {
		return STORE._getData()
	},
	componentWillUnmount: function() {
		STORE.off("storeChanged")
	},
	render: function() {
		return (
			<div className="detail-view">
				<Header />
				<ListingContainer model={this.state.etsyModel}/>
			</div>
			)
	}
})

var ListingContainer = React.createClass({
	render: function() {
		console.log("container",this.props.model)
		return (
			<div className="listing-container">
				<ListingLeftCol model={this.props.model}/>
				<ListingRightCol model={this.props.model}/>
			</div>
			)
	}
})

var ListingLeftCol = React.createClass({
	_getListingImage: function() {
		if(this.props.model.get("MainImage") !== undefined) {
			return this.props.model.get("MainImage").url_570xN
		}
	},
	render: function() {
		console.log("leftCol",this.props.model)
		return (
			<div className="listing-left-col">
				<img src={this._getListingImage()} />
				<p>{this.props.model.get("description")}</p>
			</div>
			)
	}
})

var ListingRightCol = React.createClass({
	_handleFavoriteClick: function() {
		ACTIONS.toggleFavModel(this.props.model)
		ACTIONS.addFavorite(this.props.model)
	},
	render: function() {
		var model = this.props.model
		var materialIconStyle = model.get('favorite') === true ? "favorite" : "favorite_border"

		return (
			<div className="listing-right-col">
				<p className="favorite material-icons" onClick={this._handleFavoriteClick}>{materialIconStyle}</p>
				<h3>{model.get("title")}</h3>
				<p>{"$" + model.get("price")}</p>
				<ul className="overview">
					<li>Overview</li>
					{model.get("who_made") === "i_did" ? <li>Handmade item</li> : ""}
					{model.get("materials") !== undefined && model.get("materials").length > 0 ? (model.get("materials").length > 1 ? <li>Materials: {model.get("materials").join(", ")}</li> : <li>Material: {model.get("materials")}</li>) : "" }
					<li>Viewed by: {model.get("views") + (model.get("views") === "1" ? " person" : " people")}</li>
					<li>Favorited by: {model.get("num_favorers") + (model.get("views") === "1" ? " person" : " people")}</li>
				</ul>
			</div>
			)
	}
})

export default DetailView