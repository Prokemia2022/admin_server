const mongoose = require("mongoose");

const Admin_Roles_Schema = new mongoose.Schema({
	//user info
    title: 										{type:String},
    description:  								{type:String},
    //scopes 
    product_scopes:      						[{type:String}],
    client_scopes:      						[{type:String}],
    manufacturers_scopes:      					[{type:String}],
    distributors_scopes:      					[{type:String}],
    salespeople_scopes:      					[{type:String}],
    orders_scopes:      						[{type:String}],
    industries_scopes:      					[{type:String}],
    technologies_scopes:      					[{type:String}],
    careers_scopes:      						[{type:String}],
    administrator_scopes:      					[{type:String}],
    roles_scopes:                               [{type:String}],
    manufacturer_request_scopes:      			[{type:String}],
    support_questions_scopes:                   [{type:String}],
    request_demo_scopes:                        [{type:String}],
	//date
	createdAt:		{ type: Date,default: Date.now},
},{timestamps:true})

module.exports = mongoose.model("admins_roles",Admin_Roles_Schema);
