//modules imports
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//models imports
const Admin = require('../../../../models/Admin/Admin.js');

let router = express.Router()

router.post('/',async (req,res,next)=>{
    const payload = req.body;
    //console.log(payload.user_name)
    //check if all params are available
    if(!payload){
        return  res.status(201).send('Bad Request');
    }
    //check if an admin user is authorised
    const allowed_scope_roles = ['IT','Manager']
    if (!allowed_scope_roles.includes(payload.auth_role)){
        return res.status(401).send("You are not assigned the role to create users, kindly contact the Administrator")
    }

    if(payload.admin_password !== 'admin-test'){
        return  res.status(201).send('You are not authorized to create an account');
    }
    //sign a token and encrypt password
    const salt = bcrypt.genSaltSync(10);
    const encrypted_password = bcrypt.hashSync(payload.user_password, salt);
    const user_name = payload.user_name

    const existing_admin = await Admin.findOne({user_name:user_name})

    if (!existing_admin){
        try{
            const token = jwt.sign(
                {user_name},
                process.env.TOKEN_ADMIN_KEY,
                {
                    expiresIn: '2d'
                }
            )
            ////console.log(token)
            const new_Admin = await Admin.create({
                user_name:		        payload.user_name,
    			role:			        payload.role,
    			user_password:          encrypted_password,
    			access_token: 	        token,
                user_image:             "",
    			login_status:	        false,
                hub_access_status: 		false,
    			hub_account_id: 		'',
            })
            ////console.log(new_Admin)
            return res.status(200).send('successfully added a new admin account.')
        }catch(err){
            return res.status(201).send('Could not create new admin-user at the moment, try again')
        }
    }else{
        return res.status(201).send("account already exists")
    }
});

module.exports = router