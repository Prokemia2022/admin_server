//modules imports
const express = require('express');

//models import
const Requests = require("../../../../models/Manufacturer/Manufacturer_Request.js");
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
		task:'requests',
		sub_task: 'decline',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to delete this request, kindly contact the administrator or support for any issues");
	}else{
		const id = payload._id //use id to find existing request
		const existing_Request = await Requests.findOne({_id:id})
		
		try{
			if (!existing_Request)
				return res.status(400).send("could not find this request")
	
			await Requests.findOneAndDelete({_id:id} ).then((response)=>{
				return res.status(200).send("Sucessfully deleted")
			})
		}catch(err){
			console.log(err);
			return res.status(500).send("could not delete this request at the moment")
		}
	}

})

module.exports = router;