//modules imports
const express = require("express");
//models imports
const Distributor = require('../../../../models/Distributor/Distributor.js');
const Role_Verifier = require("../../../../controllers/role_verifier.js");

const router = express.Router();
require("dotenv").config();
const axios = require('axios');
const Send_Email = require("../../../../controllers/email_handler.js");

router.post('/',async(req,res)=>{
	//get payload
	const payload = req.body; 
	const EMAIL_DEV_URL = process.env.DEV_EMAIL_BASEURL
	let base_url = 'http://localhost:8080'
	//check if payload exists
	if (!payload)
		return res.status(400).send("Bad Request")

	//check if an admin user is authorised
	const verify_role_payload = {
		task:'distributors',
		sub_task: 'approve',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to approve this distributor, kindly contact the administrator or support for any issues");
	}else{
		const id = payload._id //use id to find existing user account

		const existing_distributor = await Distributor.findOne({_id:id}) //find user account

		if (existing_distributor != null)
			try{
				const query = {_id:id};
				const update = { $set: {
					verification_status:    true,
				}};
				const options = { };
				
				await Distributor.updateOne( query, update, options).then((response)=>{
					const email_payload = {
						email : existing_distributor?.email_of_company
					}
					let api = 'api/approved_account_email'
					if (existing_distributor?.valid_email_status){
						Send_Email(api,email_payload)
					}
					return res.status(200).send("successfully edited the profile")
				})
				
			}catch(err){
				console.log(err)
				return res.status(500).send("could not edit profile at the moment");
			}
		else{
			return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
		}

	}
})

module.exports = router;