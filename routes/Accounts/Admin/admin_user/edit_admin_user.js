//modules imports
const express = require('express');
//models imports
const Admin = require('../../../../models/Admin/Admin.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body; 
	//console.log(payload)
	if (!payload)
		return res.status(400).send("Bad Request")

	const id = payload._id

	const existing_admin = await Admin.findOne({_id:id})
	//console.log(existing_admin)
	if (existing_admin)
		try{
	        const query = {_id:id};
	        const update = { $set: {
				user_name:		        payload?.user_name,
                user_image: 	        payload?.user_image,
                user_email:             payload?.user_email,
                user_mobile:            payload?.user_mobile,
                //user role
                role:			        payload.role,
                //security
                user_password:          payload?.user_password,
                login_status:	        payload?.login_status,
                hub_access_status: 	    payload?.hub_access_status,
                hub_account_id: 	    payload?.hub_account_id,
	        }};
	        const options = { };
	        
	        await Admin.updateOne( query, update, options).then((response)=>{
				return res.status(200).send("success")
			}).catch((err)=>{
				console.log(err)
			})
	    }catch(err){
	    	console.log(err)
	        return res.status(500).send("Could not edit this account, try again in a few minutes");
	    }
	else{
		return res.status(500).send("could not find this account at the moment");
	}
})

module.exports = router;