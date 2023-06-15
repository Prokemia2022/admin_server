//modules imports
const express = require("express");
//models imports
const Support_Question = require("../../models/Support/Support_questions.js");
const Role_Verifier = require("../../controllers/role_verifier.js");

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
        task:'support_questions',
        sub_task: 'mark_as_solved',
        role: payload.auth_role
    }
    const verified_result = await Role_Verifier(verify_role_payload);
    //console.log(verified_result)
    if (!verified_result){
        return res.status(401).send("You are not authorized to mark this support as solved , kindly contact the administrator or support for any issues");
    }else{

        const id = payload._id
        //console.log(id)
        
        const existing_support_question = await Support_Question.findOne({_id:id});

        if(!existing_support_question){
            return res.status(400).send('This support does not exist or may have been deleted')
        }
        //console.log(id)
        try{
            const query = {_id:id};
            const update = { $set: {
                solved: true
            }};
            const options = { };
            
            await Support_Question.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})
        }catch(err){
            return res.status(500).send("Could not update this support, try again in a few minutes");
        }
    }
})

module.exports = router;