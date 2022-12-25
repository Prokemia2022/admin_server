const express = require('express');
const cors = require('cors');
const db = require("./config/database.js")
db.connect()

const app = express()
app.use(express.json())

app.use(cors({credentials:true, 
    origin: 'http://localhost:3000' }));
//imports

/*--accounts---*/
const signin = require("./routes/Accounts/signin.js");
//const signin = require("./routes/Accounts/signin.js");
//client
const get_client_account = require("./routes/Accounts/Admin/clients/get_client.js");
const get_client_accounts = require("./routes/Accounts/Admin/clients/get_clients.js");
const suspend_client_account = require("./routes/Accounts/Admin/clients/suspend_client_account.js");
const un_suspend_client_account = require("./routes/Accounts/Admin/clients/un_suspend_client_account.js");
// const get_product = require("./routes/Accounts/client_account/get_products.js");

//distributor
const approve_distributor_account = require("./routes/Accounts/Admin/distributors/approve_distributor.js");
const get_distributor_account = require("./routes/Accounts/Admin/distributors/get_distributor.js");
const get_distributor_accounts = require("./routes/Accounts/Admin/distributors/get_distributors");
const suspend_distributor_account = require("./routes/Accounts/Admin/distributors/suspend_distributor_account.js");
const decline_distributor_account = require("./routes/Accounts/Admin/distributors/decline_distributor.js");
const un_suspend_distributor_account = require("./routes/Accounts/Admin/distributors/un_suspend_distributor_account.js");

//manufacturer
const approve_manufacturer_account = require("./routes/Accounts/Admin/manufacturers/approve_manufacturer.js");
const get_manufacturer_account = require("./routes/Accounts/Admin/manufacturers/get_manufacturer.js");
const get_manufacturer_accounts = require("./routes/Accounts/Admin/manufacturers/get_manufacturers");
const suspend_manufacturer_account = require("./routes/Accounts/Admin/manufacturers/suspend_manufacturer_account");
const un_suspend_manufacturer_account = require("./routes/Accounts/Admin/manufacturers/un_suspend_manufacturer_account");
const decline_manufacturer_account = require("./routes/Accounts/Admin/manufacturers/decline_manufacturer");

//sales
const approve_salesperson_account = require("./routes/Accounts/Admin/salespeople/approve_salesperson.js");
const get_salesperson_account = require("./routes/Accounts/Admin/salespeople/get_salesperson.js");
const get_salesperson_accounts = require("./routes/Accounts/Admin/salespeople/get_salepeople.js");
const suspend_salesperson_account = require("./routes/Accounts/Admin/salespeople/suspend_salesperson_account");
const un_suspend_salesperson_account = require("./routes/Accounts/Admin/salespeople/un_suspend_salesperson_account");
const decline_salesperson_account = require("./routes/Accounts/Admin/salespeople/decline_salesperson.js");

//admin
const add_admin_user = require("./routes/Accounts/Admin/admin_user/add_admin_user.js");
const delete_admin_user = require("./routes/Accounts/Admin/admin_user/add_admin_user.js");
const edit_admin_user = require("./routes/Accounts/Admin/admin_user/edit_admin_user.js");
const get_admin_users = require("./routes/Accounts/Admin/admin_user/get_admin_users.js");

/*---control---*/
const add_new_industry = require("./routes/control/add_new_industry.js");
const add_new_technology = require("./routes/control/add_new_technology.js");
const approve_suggested_industry = require("./routes/control/approve_suggested_industry.js");
const approve_suggested_technology = require("./routes/control/approve_suggested_technology.js");
const delete_industry = require("./routes/control/delete_industry.js");
const delete_technology = require("./routes/control/delete_technology.js");
const edit_industry = require("./routes/control/edit_industry.js");
const edit_technology = require("./routes/control/edit_technology.js");
const get_industries = require("./routes/control/get_industries.js");
const get_technologies = require("./routes/control/get_technologies.js");

/*---product---*/
const add_product = require("./routes/product/add_product.js");//done
const approve_product = require("./routes/product/approve_product.js");
const decline_product = require("./routes/product/decline_product.js");
const get_products = require("./routes/product/get_products.js");//done
const get_product = require("./routes/product/get_product.js");//done
const delete_product = require("./routes/product/delete_product.js");
const edit_product = require("./routes/product/edit_product.js");
	
/*---expert_consultaion---*/
const get_expert_accounts = require("./routes/expert_consultation/get_expert_accounts.js");
const get_expert_account = require("./routes/expert_consultation/get_expert_account.js");
const create_expert_account = require("./routes/expert_consultation/create_expert_account.js");
const delete_expert_account = require("./routes/expert_consultation/delete_expert_account.js");
const edit_expert_account = require("./routes/expert_consultation/edit_expert_account.js");

/*---orders---*/
const create_order = require("./routes/orders/create_order.js");
const edit_order = require("./routes/orders/edit_order.js");
const get_orders = require("./routes/orders/get_orders.js");
const get_order = require("./routes/orders/get_order.js");
//const create_invoice = require("./routes/orders/create_invoice.js");

/*---vacancies---*/
const add_vacancy = require("./routes/vacancies/add_vacancy.js");
const delete_vacancy = require("./routes/vacancies/delete_vacancy.js");
const edit_vacancy = require("./routes/vacancies/edit_vacancy.js");
const get_vacancies = require("./routes/vacancies/get_vacancies.js");

/*---subcription_plan---*/
const add_new_plan = require("./routes/subscription_plan/add_new_plan.js");
const delete_plan = require("./routes/subscription_plan/delete_plan.js");
const edit_plan = require("./routes/subscription_plan/edit_plan.js");
const get_subscription_plans = require("./routes/subscription_plan/get_subscription_plans.js");

/*---support----*/
const get_career_mailing_list = require("./routes/Support/get_carrer_mailing_list.js");
const get_feedbacks = require("./routes/Support/get_feedbacks.js");
const get_support_questions = require("./routes/Support/get_support_questions.js");
const get_langing_page_mailing_list = require("./routes/Support/get_landing_page_mailing_list.js");

//routes

// /*--account---*/
app.use("/api/signin",signin);//done
app.use("/api/add_admin_user",add_admin_user);//done
app.use("/api/get_admin_users",get_admin_users)//done
//client
app.use("/api/get_client_account",get_client_account);//done
app.use("/api/get_client_accounts",get_client_accounts);//done
app.use("/api/suspend_client_account",suspend_client_account);//done
app.use("/api/un_suspend_client_account",un_suspend_client_account);//done
//distributor
app.use("/api/approve_distributor_account",approve_distributor_account);//done
app.use("/api/get_distributor_account",get_distributor_account);//done
app.use("/api/get_distributor_accounts",get_distributor_accounts);//done
app.use("/api/suspend_distributor_account",suspend_distributor_account);//done
app.use("/api/decline_distributor_account",decline_distributor_account);
app.use("/api/un_suspend_distributor_account",un_suspend_distributor_account);//done

//manufacturer
app.use("/api/approve_manufacturer_account",approve_manufacturer_account);//done
app.use("/api/get_manufacturer_account",get_manufacturer_account);//done
app.use("/api/get_manufacturer_accounts",get_manufacturer_accounts);//done
app.use("/api/suspend_manufacturer_account",suspend_manufacturer_account);//done
app.use("/api/un_suspend_manufacturer_account",un_suspend_manufacturer_account);//done
app.use("/api/decline_manufacturer_account",decline_manufacturer_account);

//salesperson
app.use("/api/approve_salesperson_account",approve_salesperson_account);//done
app.use("/api/get_salesperson_account",get_salesperson_account);//done
app.use("/api/get_salesperson_accounts",get_salesperson_accounts);//done
app.use("/api/suspend_salesperson_account",suspend_salesperson_account);//done
app.use("/api/un_suspend_salesperson_account",un_suspend_salesperson_account);//done
app.use("/api/decline_salesperson_account",decline_salesperson_account);

/*---control---*/
app.use("/api/add_new_industry",add_new_industry);//done
app.use("/api/add_new_technology",add_new_technology);//done
app.use("/api/approve_suggested_industry",approve_suggested_industry);//done
app.use("/api/approve_suggested_technology",approve_suggested_technology);//done
app.use("/api/delete_industry",delete_industry);//done
app.use("/api/delete_technology",delete_technology);//done
app.use("/api/edit_industry",edit_industry);//done
app.use("/api/edit_technology",edit_technology);//done
app.use("/api/get_industries",get_industries);//done
app.use("/api/get_technologies",get_technologies);//done

/*---product---*/
app.use("/api/add_product",add_product);//done
app.use("/api/approve_product",approve_product);//done 
app.use("/api/decline_product",decline_product);
app.use("/api/get_products",get_products);//done
app.use("/api/get_product",get_product);//done
app.use("/api/delete_product",delete_product);//done
app.use("/api/edit_product",edit_product);//done

/*---expert_consultaion---*/
app.use("/api/create_expert_account",create_expert_account);
app.use("/api/get_expert_accounts",get_expert_accounts);
app.use("/api/get_expert_account",get_expert_account);
app.use("/api/delete_expert_account",delete_expert_account);
app.use("/api/edit_expert_account",edit_expert_account);

/*---vacancies---*/
app.use("/api/add_vacancy",add_vacancy);//done
app.use("/api/delete_vacancy",delete_vacancy);//done
app.use("/api/edit_vacancy",edit_vacancy);//done
app.use("/api/get_vacancies",get_vacancies);//done

/*---subcription_plan---*/
app.use("/api/add_new_plan",add_new_plan);
app.use("/api/delete_plan",delete_plan);
app.use("/api/edit_plan",edit_plan);
app.use("/api/get_subscription_plans",get_subscription_plans);

/*----support----*/
app.use("/api/get_career_mailing_list",get_career_mailing_list);
app.use("/api/get_feedbacks",get_feedbacks);
app.use("/api/get_support_questions",get_support_questions);
app.use("/api/get_mailing_list",get_langing_page_mailing_list);

/*-----orders-----*/
app.use("/api/get_orders",get_orders);//done
app.use("/api/get_order",get_order);//done
app.use("/api/edit_order",edit_order)//done

/*---prokemia_hub---*/

app.get('/',(req,res)=>{
	res.send("Home")
})

module.exports = app;