const axios = require('axios');
require("dotenv").config();

const Send_Email=async(api,email_payload)=>{
    const EMAIL_DEV_URL = process.env.DEV_EMAIL_BASEURL
	const EMAIL_PROD_URL = process.env.PROD_EMAIL_BASEURL

    let base_url = EMAIL_DEV_URL || EMAIL_PROD_URL
    console.log(`${base_url}/${api}`)

    await axios.post(`${base_url}/${api}`,email_payload).then(()=>{
        console.log('Email sent successfully.');
        return ;
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = Send_Email;