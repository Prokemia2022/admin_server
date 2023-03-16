const express = require('express');
const Technology = require("../../models/Utils/Technology.js");

let router = express.Router()

router.post("/",async (req,res)=>{
	//get payload
	const payload = req.body;
	//check if payload exists
	if (!payload){
		return res.send(401).send("Bad Request")
    }
    const allowed_scope_roles = ['IT','Manager','Supervisor','Sales']
    if (!allowed_scope_roles.includes(payload.auth_role)){
        return res.status(401).send("You are not assigned the role to approve technologies, kindly contact the Administrator")
    }

    const id = payload._id
    //console.log(id)
    
    const existing_technology = await Technology.findOne({_id:id})
    
    if(!existing_technology){
        return res.status(400).send('This technology does not exist or may have been deleted')
    }
    try{
        const query = {_id:id};
        const update = { $set: {
			verification_status: 			true,
        }};
        const options = { };
        
        await Technology.updateOne( query, update, options).then((response)=>{
            return res.status(200).send("success")
        })
    }catch(err){
        return res.status(500).send("Could not approve this technology, try again in a few minutes");
    }
})

module.exports = router;