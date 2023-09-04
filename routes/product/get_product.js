const express = require('express')
const Product = require("../../models/Utils/Product.js");

let router = express.Router()

router.post('/',async(req,res)=>{
    //get payload
    const  payload  = req.body;

    const id = payload._id
    //console.log(id)
    //use payload to find products
    if (!payload)
    	return res.status(401).send('Bad request')

    try{
        const product = await Product.findOne({_id:id});
        return res.status(200).send(product);
    }catch(err){
        console.log(err);
        return res.status(500).send("Error while fetching product")
    }
})

module.exports = router;