//modules import
const express = require("express");
const axios = require("axios")

//models imports
const Manufacturer = require('../../../../models/Manufacturer/Manufacturer.js');
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
		task:'manufacturers',
		sub_task: 'suspend',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to suspend this manufacturer, kindly contact the administrator or support for any issues");
	}else{
		const id = payload._id //get the manufacturer id

		const existing_manufacturer = await Manufacturer.findOne({_id:id}) //checks if a manufacturer_Account already exists

		if (existing_manufacturer != null) //if there is a manufacturer_account
			try{
				const query = {_id:id};
				const update = { $set: {
					suspension_status:  true,
				}};
				const options = { };
				
				await Manufacturer.updateOne( query, update, options).then((response)=>{
					const email_payload = {
						email : existing_manufacturer?.email_of_company
					}
					let api = 'api/suspend_account_email'
					if (existing_manufacturer?.valid_email_status){
						Send_Email(api,email_payload)
					}
					// const email_payload = {
					// 	email : existing_manufacturer.email_of_company
					// }
					// if (existing_manufacturer?.valid_email_status){
					// 	axios.post("https://prokemiaemailsmsserver-production.up.railway.app/api/suspend_account_email",email_payload)
					// }
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