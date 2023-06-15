//modules imports
const express = require("express");
//models imports
const Request_Demo = require("../../../models/Support/Request_Demo_Ticket.js");
const Role_Verifier = require("../../../controllers/role_verifier.js");

let router = express.Router()

router.post("/",async (req,res)=>{
    //get product details
    const payload = req.body;

    console.log(payload)
    if(!payload){
        return res.status(400).send('Bad request')
    }

    //check if an admin user is authorised
    const verify_role_payload = {
        task:'request_demo_tickets',
        sub_task: 'un_mark_as_solved',
        role: payload.auth_role
    }
    const verified_result = await Role_Verifier(verify_role_payload);
    //console.log(verified_result)
    if (!verified_result){
        return res.status(401).send("You are not authorized to unmark this ticket as solved , kindly contact the administrator or support for any issues");
    }else{

        const id = payload._id
        //console.log(id)
        
        const existing_tickets = await Request_Demo.findOne({_id:id});

        if(!existing_tickets){
            return res.status(400).send('This ticket does not exist or may have been deleted')
        }
        //console.log(id)
        try{
            const query = {_id:id};
            const update = { $set: {
                completed_status: false,
                completed_by: ''
            }};
            const options = { };
            
            await Request_Demo.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})
        }catch(err){
            return res.status(500).send("Could not update this ticket, try again in a few minutes");
        }
    }
})

module.exports = router;