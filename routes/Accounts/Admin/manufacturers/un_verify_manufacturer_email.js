//modules imports
const express = require('express');

//models import
const Manufacturer = require('../../../../models/Manufacturer/Manufacturer.js');
const Role_Verifier = require("../../../../controllers/role_verifier.js");

let router = express.Router()

router.post('/',async (req,res,next)=>{
    const payload = req.body; //get payload
    
    //check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }

    //check if an admin user is authorised
	const verify_role_payload = {
		task:'manufacturers',
		sub_task: 'approve',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to verify this manufacturer's email, kindly contact the administrator or support for any issues");
	}else{
		const id = payload._id //use id to find existing user account
		const existing_manufacturer = await Manufacturer.findOne({_id:id});

		if (existing_manufacturer != null)
			try{
				const query = {_id:id};
				const update = { $set: {
					valid_email_status:    false,
				}};
				const options = { };
				
				await Manufacturer.updateOne( query, update, options).then((response)=>{
					return res.status(200).send("success")
				})	
			}catch(err){
				console.log(err)
				return res.status(500).send("could not verify profile at the moment");
			}
		else{
			return res.status(500).send("could not verify this account, it may have been deleted or it doesnt exist");
		}
	}
})

module.exports = router;