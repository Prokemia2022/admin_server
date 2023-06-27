//modules import
const express = require("express");
//models import
const Sales = require('../../../../models/Sales/SalesPerson.js');
const Role_Verifier = require("../../../../controllers/role_verifier.js");

const router = express.Router();

router.post('/',async(req,res)=>{
	//get_payload
	const payload = req.body; 

	if (!payload){
		return res.status(400).send("Bad Request")
	}

	 //check if an admin user is authorised
	 const verify_role_payload = {
		task:'salespeople',
		sub_task: 'approve',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to approve this account, kindly contact the administrator or support for any issues");
	}else{
		const id = payload._id //get the salesperson id
		const existing_salesperson = await Sales.findOne({_id:id})
	
		if (existing_salesperson != null)
			try{
				const query = {_id:id};
				const update = { $set: {
					valid_email_status:    true,
				}};
				const options = { };
				
				await Sales.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})	
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