const express = require('express')
const Industry = require("../../models/Utils/Industry.js");
const Technology = require("../../models/Utils/Technology.js");
const Distributor = require("../../models/Distributor/Distributor");
const Manufacturer = require("../../models/Manufacturer/Manufacturer.js");
const Sales = require("../../models/Sales/SalesPerson.js");
const Orders = require('../../models/Utils/Order.js')
const Product = require("../../models/Utils/Product.js");

let router = express.Router()

router.get('/',async(req,res)=>{
    try {
        //suppliers
        const suppliers_query = {verification_status: false};
        const suppliers_projection = {company_name: 1, email_of_company : 1, mobile_of_company: 1, created_At: 1}

        const distributors = await Distributor.find(suppliers_query,suppliers_projection);
        const manufacturers = await Manufacturer.find(suppliers_query,suppliers_projection);
        //console.log('distributors',distributors);
        //console.log('manufacturers',manufacturers);

        //salespeople
        const sales_query = {verification_status: false};
        const sales_projection = {first_name: 1, last_name: 1, email_of_salesperson : 1, mobile_of_salesperson: 1, created_At: 1};

        const salespeople = await Sales.find(sales_query,sales_projection);
        //console.log('salespeople',salespeople);

        //orders
        const orders_query = {order_notification_status: false};
        const orders_projection = {name_of_product: 1, total: 1, creator_name : 1, creator_id: 1, company_name_of_client: 1, email_of_client: 1, mobile_of_client: 1, created_At: 1};

        const orders = await Orders.find(orders_query,orders_projection);
        //console.log('orders',orders);
        
        //products
        const products_query = {verification_status: false};
        const products_projection = {name_of_product: 1, email_of_lister : 1, listed_by_id: 1, short_on_expiry: 1, short_on_expiry_date: 1, distributed_by: 1, industry: 1,technology: 1 , created_At: 1};

        const products = await Product.find(products_query,products_projection);
        //console.log('products',products);

        //industries
        const industries_query = {verification_status: false};
        const industries_projection = {title: 1, description : 1, createdAt: 1};

        const industries = await Industry.find(industries_query,industries_projection);
        //console.log('industries',industries);

        //technology
        const technology_query = {verification_status: false};
        const technology_projection = {title: 1, description : 1, createdAt: 1};

        const technologies = await Technology.find(technology_query,technology_projection);

        const total = distributors?.length + manufacturers?.length + salespeople?.length + orders?.length + products?.length + industries?.length + technologies?.length
        

        const data = {
            products:           products,
            distributors:       distributors,
            manufacturers:      manufacturers,
            orders:             orders,
            salespeople:        salespeople,
            industries:         industries,
            technologies:       technologies,
            total:  total
        }
        //console.log(data)
        res.status(200).send(data)
        return ;
    } catch (error) {
        //console.log(error)
    }
})

module.exports = router;

