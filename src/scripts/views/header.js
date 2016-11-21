import React from "react"
import ACTIONS from "../actions"

var Header = React.createClass({
	_handleSearchClick: function(event) {
		var inputNode = document.querySelector(".search"),
			query = inputNode.value
			ACTIONS.search(query)
			query = ""
	},
	_handleSearchKey: function(event) {
		var	query = event.target.value
		if(event.keyCode === 13){
			ACTIONS.search(query)
			query = ""
		}
	},
	render: function() {
		return (
			<header>
				<a href="#home">Etsy</a>
				<input 
					className="search" 
					placeholder="What are you shopping for?" 
					onKeyDown={this._handleSearchKey}
				/>
				<input 
					className="search-button" 
					type="button"
					onClick={this._handleSearchClick}
					value="Search"
				/>
				<a href="#favorites">My Favorites</a>

			</header>
		)
	}
})

export default Header