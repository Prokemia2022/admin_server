//modules imports
const express = require("express");
//models imports
const Request_Demo = require("../../../models/Support/Request_Demo_Ticket.js");
const Role_Verifier = require("../../../controllers/role_verifier.js");

let router = express.Router()

router.post("/",async (req,res)=>{
    //get payload
    const payload = req.body;
    //check if payload exists
    if(!payload){
        return res.send(400).send("Bad Request")
    }
    
    //check if an admin user is authorised
    const verify_role_payload = {
        task:'request_demo_tickets',
        sub_task: 'delete',
        role: payload.auth_role
    }
    const verified_result = await Role_Verifier(verify_role_payload);
    //console.log(verified_result)
    if (!verified_result){
        return res.status(401).send("You are not authorized to delete this ticket question, kindly contact the administrator or support for any issues");
    }else{
        try{
            const id = payload._id
            const existing_ticket = await Request_Demo.findOne({_id:id});
            if (!existing_ticket)
                return res.status(400).send("could not find this ticket");
    
            await Request_Demo.findOneAndDelete({_id:id} ).then((response)=>{
                return res.status(200).send("Sucessfully deleted this ticket")
            })
            //return res.status(200).send("Sucessfully deleted")
        }catch(err){
            console.log(err);
            return res.status(500).send("could not delete this ticket at the moment")
        }
    }
})

module.exports = router;