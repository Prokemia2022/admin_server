//modules imports
const express = require('express');
//models imports
const Admin_Role = require("../../../../models/Admin/Admin_scope_roles.js");
const Role_Verifier = require("../../../../controllers/role_verifier.js")
let router = express.Router()

router.post('/',async (req,res,next)=>{
    const payload = req.body;

    if(!payload){
        return  res.status(201).send('Bad Request');
    }
    
    //check if an admin user is authorised
    const verify_role_payload = {
        task:'roles',
        sub_task: 'add_roles',
        role: payload.auth_role
    }
    const verified_result = await Role_Verifier(verify_role_payload);
    //console.log(verified_result)
    if (!verified_result){
        return res.status(401).send("You are not authorized to add roles, kindly contact the administrator or support for any issues");
    }else{
        const title = payload.title;
        const existing_role = await Admin_Role.findOne({title:title})

        if (!existing_role){
            try{
                const new_Role = await Admin_Role.create({
                    //user info
                    title: 										payload.title,
                    description:  								payload.description,
                    //scopes 
                    product_scopes:      						payload.product_scopes,
                    client_scopes:      						payload.customers_scopes,
                    manufacturers_scopes:      					payload.manufacturers_scopes,
                    distributors_scopes:      					payload.distributors_scopes,
                    salespeople_scopes:      					payload.salespeople_scopes,
                    orders_scopes:      						payload.orders_scopes,
                    industries_scopes:      					payload.industries_scopes,
                    technologies_scopes:      					payload.technologies_scopes,
                    careers_scopes:      						payload.careers_scopes,
                    administrator_scopes:      					payload.administrator_scopes,
                    roles_scopes:                               payload.roles_management_scopes,
                    manufacturer_request_scopes:      			payload.requests_scopes,
                    support_questions_scopes:                   payload.support_questions_scopes,
                    request_demo_scopes:                        payload.request_demo_scopes
                })
                ////console.log(new_Admin)
                return res.status(200).send(`successfully created ${new_Role?.title}.`)
            }catch(err){
                console.log(err)
                return res.status(401).send('Could not create new role at the moment, try again')
            }
        }else{
            return res.status(401).send("this role already exists")
        }
    }
});

module.exports = router;