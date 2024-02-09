const mongoose = require("mongoose");

const IndustrySchema = new mongoose.Schema({
	title: 						{ type: String},
	cover_image: 				{ type: String},
	description: 				{ type: String},
	//verification_status
	verification_status:		{ type: Boolean},
	publish_status:				{ type:Boolean}
},{timestamps:true})

module.exports = mongoose.model("industries",IndustrySchema)