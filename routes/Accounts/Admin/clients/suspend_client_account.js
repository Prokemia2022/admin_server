//modules import
const express = require("express");
const axios = require("axios")

//models imports
const Client = require('../../../../models/Client/Client.js');
const Role_Verifier = require("../../../../controllers/role_verifier.js")

const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body; 

	console.log(payload)
	if (!payload){
		return res.status(400).send("Bad Request")
	}

	//check if an admin user is authorised
    const verify_role_payload = {
        task:'customers',
        sub_task: 'suspend',
        role: payload.auth_role
    }
    const verified_result = await Role_Verifier(verify_role_payload);
    //console.log(verified_result)
    if (!verified_result){
        return res.status(401).send("You are not authorized to suspend this customer, kindly contact the administrator or support for any issues");
    }else{
		const id = payload._id //get the client id
	
		const existing_client = await Client.findOne({_id:id}) //checks if a client_Account already exists
	
		if (existing_client != null) //if there is a client_account
			try{
				const query = {_id:id};
				const update = { $set: {
					suspension_status:  true,
				}};
				const options = { };
				
				await Client.updateOne( query, update, options).then((response)=>{
					const email_payload = {
						email : existing_client.email_of_company
					}
					if (existing_client?.valid_email_status){
						axios.post("https://prokemiaemailsmsserver-production.up.railway.app/api/suspend_account_email",email_payload)
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