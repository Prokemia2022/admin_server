const express = require('express');

const Product = require("../../models/Utils/Product.js");
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
        task:'products',
        sub_task: 'edit_product',
        role: payload.auth_role
    }
    const verified_result = await Role_Verifier(verify_role_payload);
    //console.log(verified_result)
    if (!verified_result){
        return res.status(401).send("You are not authorized to edit this product, kindly contact the administrator or support for any issues");
    }else{

        const id = payload._id
        //console.log(id)
        
        const existing_product = await Product.findOne({_id:id})
        
        //console.log(existing_product)
        if(!existing_product){
            return res.status(400).send('This product does not exist or may have been deleted')
        }
        // const id = existingproduct._id
        //console.log(id)
        try{
            const query = {_id:id};
            const update = { $set: {
                name_of_product: 					payload.name_of_product,
                manufactured_by: 					payload.manufactured_by,
                manufactured_by_id:					payload.manufactured_by_id,
                distributed_by:						payload.distributed_by,
                distributed_by_id:					payload.distributed_by_id,
                listed_by_id:                       payload.listed_by_id,
                description_of_product:				payload.description_of_product,
                chemical_name:  					payload.chemical_name,
                function:							payload.function,
                brand:								payload.brand,
                data_sheet:							payload.data_sheet_url,
                safety_data_sheet:					payload.safety_data_sheet_url,
                formulation_document: 				payload.formulation_document_url,
                features_of_product:				payload.features_of_product,
                application_of_product:				payload.application_of_product,
                packaging_of_product:				payload.packaging_of_product,
                storage_of_product:					payload.storage_of_product,
                industry: 							payload.industry,
                technology: 						payload.technology,
                short_on_expiry: 					payload.short_on_expiry,
                short_on_expiry_date:				payload.short_on_expiry_date,
                email_of_lister:                    payload.email_of_lister,
                website_link_to_Seller: 			payload.website_link_to_Seller,
            }};
            const options = { };
            
            await Product.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})
        }catch(err){
            return res.status(500).send("Could not edit this product, try again in a few minutes");
        }
    }
})

module.exports = router;