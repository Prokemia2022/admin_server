const express = require("express");
const Technology = require("../../models/Utils/Technology.js");
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
		task:'technologies',
		sub_task: 'add',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to add this technology, kindly contact the administrator or support for any issues");
	}else{
		const existing_technologies = await Technology.find();
		const filtered_results = existing_technologies.filter((ind)=> ind.title.toLowerCase() === payload.title?.toLowerCase());
		if (filtered_results.length === 0){
			try{
				const new_Technology= await Technology.create({
					title:					payload.title,
					description: 				payload.description,
					cover_image: 			payload.cover_image,
					verification_status: 			payload.verification_status,
                	publish_status:				payload.publish_status
				})
				return res.status(200).send("successfully added a new technology")
			}catch(err){
				console.log(err)
				return res.status(500).send("Could not add a new technology")
			}
		}else{
			return res.status(401).send("This technology already exists");
		}
	}
})

module.exports = router;