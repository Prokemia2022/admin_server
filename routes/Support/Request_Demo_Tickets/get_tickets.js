//modules imports
const express = require("express");
//models imports
const Request_Demo = require("../../../models/Support/Request_Demo_Ticket.js");

const router = express.Router()

router.get("/",async(req,res)=>{
	try{
		const tickets = await Request_Demo.find();
		return res.status(200).send(tickets)
	}catch(err){
		console.log(err)
		return res.status(500).send("Error while fetching tickets")
	}
})

module.exports = router;