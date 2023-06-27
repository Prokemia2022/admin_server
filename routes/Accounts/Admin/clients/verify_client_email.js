//modules imports
const express = require("express");
//models imports
const Client = require("../../../../models/Client/Client.js");
const Role_Verifier = require("../../../../controllers/role_verifier.js");

const router = express.Router();

router.post('/',async(req,res)=>{
	//get payload
	const payload = req.body; 

	//check if payload exists
	if (!payload)
		return res.status(400).send("Bad Request")

	//check if an admin user is authorised
	const verify_role_payload = {
		task:'customers',
		sub_task: 'delete',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to update this client, kindly contact the administrator or support for any issues");
	}else{
		const id = payload._id //get the client id
		const existing_customers = await Client.findOne({_id:id}) //find user account

		if (existing_customers != null)
			try{
				const query = {_id:id};
				const update = { $set: {
					valid_email_status:    true,
				}};
				const options = { };
				
				await Client.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})	
			}catch(err){
			console.log(err)
			return res.status(500).send("could not verify the profile at the moment");
		}
		else{
			return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
		}
	}
})

module.exports = router;