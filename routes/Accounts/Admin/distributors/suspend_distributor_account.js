//modules import
const express = require("express");
const axios = require("axios")

//models imports
const Distributor = require('../../../../models/Distributor/Distributor.js');
const Role_Verifier = require("../../../../controllers/role_verifier.js");
const Send_Email = require("../../../../controllers/email_handler.js");

const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body; 

	console.log(payload)
	if (!payload){
		return res.status(400).send("Bad Request")
	}

	//check if an admin user is authorised
	const verify_role_payload = {
		task:'distributors',
		sub_task: 'suspend',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to suspend this distributor, kindly contact the administrator or support for any issues");
	}else{
		const id = payload._id //get the distributor id
	
		const existing_distributor = await Distributor.findOne({_id:id}) //checks if a distributor_Account already exists
	
		if (existing_distributor != null) //if there is a distributor_account
			try{
				const query = {_id:id};
				const update = { $set: {
					suspension_status:  true,
				}};
				const options = { };
				
				await Distributor.updateOne( query, update, options).then((response)=>{
					const email_payload = {
						email : existing_distributor?.email_of_company
					}
					let api = 'api/suspend_account_email'
					if (existing_distributor?.valid_email_status){
						Send_Email(api,email_payload)
					}
					return res.status(200).send("success")
				})	
			}catch(err){
			console.log(err)
			return res.status(500).send("could not suspend profile at the moment");
		}
		else{
			return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
		}
	}
})

module.exports = router;