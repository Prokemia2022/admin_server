const express = require("express");
const Industry = require("../../models/Utils/Industry.js");
const Role_Verifier = require("../../controllers/role_verifier.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	const payload = req.body; //get payload
    
    //check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }

    //check if an admin user is authorised
	const verify_role_payload = {
		task:'industries',
		sub_task: 'add',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to add this industry, kindly contact the administrator or support for any issues");
	}else{
		const existing_industries = await Industry.find();
		const filtered_results = existing_industries.filter((ind)=> ind.title.toLowerCase() === payload.title?.toLowerCase());
		if (filtered_results.length === 0){
			try{
				const new_Industry = await Industry.create({
					title:						payload.title,
					description: 				payload.description,
					cover_image: 				payload.cover_image,
					verification_status:		payload.verification_status,
					publish_status:				payload.publish_status
				})
				return res.status(200).send("successfully added a new industry")
			}catch(err){
				console.log(err)
				return res.status(500).send("Could not add a new industry,try again in a few minutes")
			}
		}else{
			return res.status(401).send("This industry already exists");
		}
	}	
})

module.exports = router;