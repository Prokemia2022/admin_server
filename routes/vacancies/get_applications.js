//modules imports
const express = require("express");
//models imports
const Application = require('../../models/Utils/applications.js')

const router = express.Router()

router.get("/",async(req,res)=>{
	try{
		const existing_applications = await Application.find();
		return res.status(200).send(existing_applications)
	}catch(err){
		console.log(err)
		return res.status(500).send("fetch these applications")
	}
})

module.exports = router;