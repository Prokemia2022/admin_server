const express = require('express');
const Technology = require("../../models/Utils/Technology.js");
const Role_Verifier = require("../../controllers/role_verifier.js");

let router = express.Router()

router.post("/",async (req,res)=>{
	const payload = req.body; //get payload
    
    //check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }

    //check if an admin user is authorised
	const verify_role_payload = {
		task:'technologies',
		sub_task: 'edit',
		role: payload.auth_role
	}
	const verified_result = await Role_Verifier(verify_role_payload);
	//console.log(verified_result)
	if (!verified_result){
		return res.status(401).send("You are not authorized to edit this technology, kindly contact the administrator or support for any issues");
	}else{
        const id = payload._id
        //console.log(id)
        
        const existing_technology = await Technology.findOne({_id:id})
        
        if(!existing_technology){
            return res.status(400).send('This technology does not exist or may have been deleted')
        }
        try{
            const query = {_id:id};
            const update = { $set: {
                title:			            payload.title,
                cover_image: 	            payload.cover_image,
                description:        payload.description,
                verification_status: 		payload.verification_status,
                verification_status: 			payload.verification_status,
                publish_status:				payload.publish_status
            }};
            const options = { };
            
            await Technology.updateOne( query, update, options).then((response)=>{
                return res.status(200).send("success")
            })
        }catch(err){
            return res.status(500).send("Could not edit this technology, try again in a few minutes");
        }
    }
})

module.exports = router;