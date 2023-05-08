//this endpoint will email distributor to notify them that their account has been declined.
//modules imports
const express = require("express");
//models imports
const Distributor = require('../../../../models/Distributor/Distributor.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	//get payload
	const payload = req.body; 

	//check if payload exists
	if (!payload){
		return res.status(400).send("Bad Request")
	}

	const allowed_scope_roles = ['IT','Manager','Supervisor','Sales']
    if (!allowed_scope_roles.includes(payload.auth_role)){
        return res.status(401).send("You are not assigned the role to suspend accounts, kindly contact the Administrator")
    }

	const id = payload._id //use id to find existing user account

	const existing_distributor = await Distributor.findOne({_id:id}) //find user account

	if (existing_distributor != null)
		try{
			const query = {_id:id};
	        const update = { $set: {
				subscription:    true,
	        }};
	        const options = { };
	        
	        await Distributor.updateOne( query, update, options).then((response)=>{
				return res.status(200).send("successfully subscribed this account.")
			})
    	}catch(err){
			console.log(err)
			return res.status(500).send("could not subscribe this profile at the moment");
		}
	else{
		return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
	}
})

module.exports = router;