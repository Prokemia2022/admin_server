//modules imports
const express = require('express');
//models imports
const Admin = require('../../../../models/Admin/Admin.js');
const Role_Verifier = require("../../../../controllers/role_verifier.js")

const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body; 
	//console.log(payload)

	if (!payload){
			return res.status(400).send("Bad Request")
	}

	//check if an admin user is authorised
    const verify_role_payload = {
        task:'administrators',
        sub_task: 'delete_user',
        role: payload.auth_role
    }
    const verified_result = await Role_Verifier(verify_role_payload);
    //console.log(verified_result)
    if (!verified_result){
        return res.status(401).send("You are not authorized to remove a user, kindly contact the administrator or support for any issues");
    }else{
		const id = payload._id
	
		const existing_admin = await Admin.findOne({_id:id})
		
		try{
			if (!existing_admin)
				return res.status(400).send("could not find this account")
	
			await Admin.findOneAndDelete({_id:id} ).then((response)=>{
				return res.status(200).send("Sucessfully deleted")
			})
		}catch(err){
			console.log(err);
			return res.status(500).send("could not delete this user at the moment")
		}
	}

})

module.exports = router;