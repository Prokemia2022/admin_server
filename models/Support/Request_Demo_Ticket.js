const mongoose = require("mongoose");

const request_demo_ticket_Schema = new mongoose.Schema({
	name: 			    { type: String },
	email:  			{ type: String },
	mobile:  			{ type: String },
    job_function:  		{ type: String },
	completed_status:   { type: Boolean},
	completed_by:       { type: String},
	createdAt:			{ type: Date,default: Date.now},
},{timestamps:true})

module.exports = mongoose.model("request_demo_ticket",request_demo_ticket_Schema);