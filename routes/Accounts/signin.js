//modules imports
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//models import
const Admin = require("../../models/Admin/Admin.js");

const router = express.Router();

router.post('/',async(req,res,next)=>{
	const payload = req.body; //gets payload
	//console.log(payload);

	if (!payload)
		return res.status(201).send("Bad Request, no payload found")

	const admin_result = await Admin.findOne({user_name:payload.user_name});
	
	if (!admin_result)
		return res.status(201).send("Wrong user log in credentials")
	
	try{
		const compare = bcrypt.compareSync(payload.user_password,admin_result?.user_password)
		//console.log(compare)
		if(compare){
			const id = admin_result?._id
			const user_name = admin_result?.user_name
			const role = admin_result?.role

			const token = jwt.sign(
				{user_name,id,role},
				process.env.TOKEN_ADMIN_KEY,
				{
					expiresIn: '24'
				}
			)

			const query = {_id:id};
	        const update = { $set: {
				login_status:	true,
	        }};
	        const options = { };
	        
			// console.log(token)
	        await Admin.updateOne( query, update, options).then((response)=>{
				return res.status(200).send(token)
			})
		}else{
			return res.status(201).send("wrong user log in credentials, try again");	
		}
	}catch(err){
		console.log(err)
		return res.status(500).send("Error while signing in");
	}
})

module.exports = router;