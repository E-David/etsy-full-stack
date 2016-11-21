const mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
const usersSchema = new mongoose.Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
   // example of optional fields
  name:      { type: String },
  createdAt: { type: Date, default: Date.now }

})

const favSchema = new mongoose.Schema({
	favorite: { type: Boolean, default: true },
  listing_id:       Number,
  state:            String,
  title:            String,
  description:      String,
  price:            String,
  materials:        Array,
  shop_section_id:  Number,
  url:              String,
  views:            Number,
  num_favorers:     Number,
  who_made:         String,
  MainImage:        Object,
  Shop:             Object

}, { strict: false })

module.exports = {
  User: mongoose.model('User', usersSchema),
  Fav: mongoose.model('Fav', favSchema)
}
