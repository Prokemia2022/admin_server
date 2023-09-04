//modules import
const express = require('express');
//models import
const Distributor = require("../../../../models/Distributor/Distributor.js");

let router = express.Router()

router.post('/',async(req,res)=>{
     //get payload
     const payload  = req.body;
     //check if payload exists
    if (!payload)
        return res.status(401).send('Bad request')
 
    const id = payload._id;

    try{
        const distributor = await Distributor.findOne({_id:id});
        return res.status(200).send(distributor)        
    }catch(err){
        console.log(err);
        return res.status(500).send("Error while fetching distributor")
    }
})

module.exports = router