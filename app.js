const express = require('express');
const cors = require('cors');
const db = require("./config/database.js")
db.connect()

const app = express()
app.use(express.json())

let origins = ['https://prokemia-admin-web.vercel.app',
				'https://prokemia-admin-web-musembi77.vercel.app',
				'http://localhost:3000',
				'https://admin-frontend-pi.vercel.app',
				'https://admin.prokemia.com/'];
app.use(cors({credentials:true, origin: '*'}));
//imports

const notifications = require('./routes/control/notifications.js')
app.use('/api/notifications',notifications);
/*--accounts---*/
const signin = require("./routes/Accounts/signin.js");
//const signin = require("./routes/Accounts/signin.js");
//client
const get_client_account = require("./routes/Accounts/Admin/clients/get_client.js");
const get_client_accounts = require("./routes/Accounts/Admin/clients/get_clients.js");
const suspend_client_account = require("./routes/Accounts/Admin/clients/suspend_client_account.js");
const un_suspend_client_account = require("./routes/Accounts/Admin/clients/un_suspend_client_account.js");
const delete_client_account = require("./routes/Accounts/Admin/clients/delete_client.js");
const verify_client_email = require("./routes/Accounts/Admin/clients/verify_client_email.js")
const un_verify_client_email = require("./routes/Accounts/Admin/clients/un_verify_client_email.js")
// const get_product = require("./routes/Accounts/client_account/get_products.js");

//distributor
const approve_distributor_account = require("./routes/Accounts/Admin/distributors/approve_distributor.js");
const get_distributor_account = require("./routes/Accounts/Admin/distributors/get_distributor.js");
const get_distributor_accounts = require("./routes/Accounts/Admin/distributors/get_distributors");
const suspend_distributor_account = require("./routes/Accounts/Admin/distributors/suspend_distributor_account.js");
const decline_distributor_account = require("./routes/Accounts/Admin/distributors/decline_distributor.js");
const un_suspend_distributor_account = require("./routes/Accounts/Admin/distributors/un_suspend_distributor_account.js");
const subscribe_distributor_account = require("./routes/Accounts/Admin/distributors/subscribe_distributor_account.js");
const un_subscribe_distributor_account = require("./routes/Accounts/Admin/distributors/un_subscribe_distributor_account.js");
const delete_distributor_account = require("./routes/Accounts/Admin/distributors/delete_distributor.js");
const verify_distributor_email = require("./routes/Accounts/Admin/distributors/verify_distributor_email.js")
const un_verify_distributor_email = require("./routes/Accounts/Admin/distributors/un_verify_distributor_email.js")

//manufacturer
const approve_manufacturer_account = require("./routes/Accounts/Admin/manufacturers/approve_manufacturer.js");
const get_manufacturer_account = require("./routes/Accounts/Admin/manufacturers/get_manufacturer.js");
const get_manufacturer_accounts = require("./routes/Accounts/Admin/manufacturers/get_manufacturers");
const suspend_manufacturer_account = require("./routes/Accounts/Admin/manufacturers/suspend_manufacturer_account");
const un_suspend_manufacturer_account = require("./routes/Accounts/Admin/manufacturers/un_suspend_manufacturer_account");
const decline_manufacturer_account = require("./routes/Accounts/Admin/manufacturers/decline_manufacturer");
const subscribe_manufacturer_account = require("./routes/Accounts/Admin/manufacturers/subscribe_manufacturer_account.js");
const un_subscribe_manufacturer_account = require("./routes/Accounts/Admin/manufacturers/un_subscribe_manufacturer_account.js");
const delete_manufacturer_account = require("./routes/Accounts/Admin/manufacturers/delete_manufacturer.js");
const verify_manufacturer_email = require("./routes/Accounts/Admin/manufacturers/verify_manufacturer_email.js")
const un_verify_manufacturer_email = require("./routes/Accounts/Admin/manufacturers/un_verify_manufacturer_email.js")

//sales
const approve_salesperson_account = require("./routes/Accounts/Admin/salespeople/approve_salesperson.js");
const get_salesperson_account = require("./routes/Accounts/Admin/salespeople/get_salesperson.js");
const get_salesperson_accounts = require("./routes/Accounts/Admin/salespeople/get_salepeople.js");
const suspend_salesperson_account = require("./routes/Accounts/Admin/salespeople/suspend_salesperson_account");
const un_suspend_salesperson_account = require("./routes/Accounts/Admin/salespeople/un_suspend_salesperson_account");
const decline_salesperson_account = require("./routes/Accounts/Admin/salespeople/decline_salesperson.js");
const delete_salesperson_account = require("./routes/Accounts/Admin/salespeople/delete_salesperson.js");
const verify_salesperson_email = require("./routes/Accounts/Admin/salespeople/verify_saleperson_email.js")
const un_verify_salesperson_email = require("./routes/Accounts/Admin/salespeople/un_verify_salesperson_email.js")

//admin
const add_admin_user = require("./routes/Accounts/Admin/admin_user/add_admin_user.js");
const delete_admin_user = require("./routes/Accounts/Admin/admin_user/delete_admin_user.js");
const edit_admin_user = require("./routes/Accounts/Admin/admin_user/edit_admin_user.js");
const get_admin_users = require("./routes/Accounts/Admin/admin_user/get_admin_users.js");
const get_admin_user = require("./routes/Accounts/Admin/admin_user/get_admin_user.js");
const change_password = require("./routes/Accounts/Admin/admin_user/change_password.js");
//admin_roles
const add_role = require("./routes/Accounts/Admin/roles/add_admin_roles.js");
const delete_roles = require("./routes/Accounts/Admin/roles/delete_admin_roles.js");
const edit_roles = require("./routes/Accounts/Admin/roles/edit_admin_roles.js");
const get_roles = require("./routes/Accounts/Admin/roles/get_admin_roles.js");
const get_role = require("./routes/Accounts/Admin/roles/get_admin_role.js");

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
const add_product = require("./routes/product/add_product.js");
const approve_product = require("./routes/product/approve_product.js");
const decline_product = require("./routes/product/decline_product.js");
const get_products = require("./routes/product/get_products.js");
const get_product = require("./routes/product/get_product.js");
const delete_product = require("./routes/product/delete_product.js");
const edit_product = require("./routes/product/edit_product.js");
const feature_product = require("./routes/product/feature_product.js");
const un_feature_product = require("./routes/product/un_feature_product.js");
	
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
const reject_order = require("./routes/orders/reject_order.js");
const approve_order = require("./routes/orders/approve_order.js");
const delete_order = require("./routes/orders/delete_order.js");

/*---vacancies---*/
const add_vacancy = require("./routes/vacancies/add_vacancy.js");
const delete_vacancy = require("./routes/vacancies/delete_vacancy.js");
const edit_vacancy = require("./routes/vacancies/edit_vacancy.js");
const get_vacancies = require("./routes/vacancies/get_vacancies.js");
const get_applications = require("./routes/vacancies/get_applications.js")

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
const mark_support_as_solved = require('./routes/Support/mark_support_as_solved.js');
const un_mark_support_as_solved = require('./routes/Support/unmark_support_as_solved.js');
const delete_support_question = require('./routes/Support/delete_support_question.js');
const get_request_demo_tickets = require('./routes/Support/Request_Demo_Tickets/get_tickets.js')
const mark_request_demo_ticket_as_solved = require('./routes/Support/Request_Demo_Tickets/mark_ticket_as_solved.js')
const un_mark_request_demo_ticket_as_solved = require('./routes/Support/Request_Demo_Tickets/unmark_ticket_as_solved.js')
const delete_ticket = require('./routes/Support/Request_Demo_Tickets/delete_ticket.js')

/*-----Request-----*/
const get_requests = require("./routes/Accounts/Admin/manufacturers/get_requests");
const complete_requests = require("./routes/Accounts/Admin/manufacturers/complete_request");
const delete_request = require("./routes/Accounts/Admin/manufacturers/delete_request");
//routes

// /*--account---*/
app.use("/api/signin",signin);
app.use("/api/add_admin_user",add_admin_user);//done
app.use("/api/get_admin_users",get_admin_users)//done
app.use("/api/get_admin_user",get_admin_user)//done
app.use("/api/edit_admin_user",edit_admin_user)//done
app.use("/api/delete_admin_user",delete_admin_user);//done
app.use("/api/change_password",change_password);//done
//admin_roles
app.use("/api/add_role",add_role);//done
app.use("/api/delete_roles",delete_roles);//done
app.use("/api/edit_roles",edit_roles);//done
app.use("/api/get_roles",get_roles);//done
app.use("/api/get_role",get_role);//done
//client
app.use("/api/get_client_account",get_client_account);//done
app.use("/api/get_client_accounts",get_client_accounts);//done
app.use("/api/suspend_client_account",suspend_client_account);//done
app.use("/api/un_suspend_client_account",un_suspend_client_account);//done
app.use("/api/delete_client_account",delete_client_account);//done
app.use("/api/verify_client_email",verify_client_email);//done
app.use("/api/un_verify_client_email",un_verify_client_email);//done
//distributor
app.use("/api/approve_distributor_account",approve_distributor_account);//done
app.use("/api/get_distributor_account",get_distributor_account);//done
app.use("/api/get_distributor_accounts",get_distributor_accounts);//done
app.use("/api/suspend_distributor_account",suspend_distributor_account);//done
app.use("/api/decline_distributor_account",decline_distributor_account);
app.use("/api/un_suspend_distributor_account",un_suspend_distributor_account);//done
app.use("/api/subscribe_distributor_account",subscribe_distributor_account);//done
app.use("/api/un_subscribe_distributor_account",un_subscribe_distributor_account);//done
app.use("/api/delete_distributor_account",delete_distributor_account);//done
app.use("/api/verify_distributor_email",verify_distributor_email);//done
app.use("/api/un_verify_distributor_email",un_verify_distributor_email);//done

//manufacturer
app.use("/api/approve_manufacturer_account",approve_manufacturer_account);//done
app.use("/api/get_manufacturer_account",get_manufacturer_account);//done
app.use("/api/get_manufacturer_accounts",get_manufacturer_accounts);//done
app.use("/api/suspend_manufacturer_account",suspend_manufacturer_account);//done
app.use("/api/un_suspend_manufacturer_account",un_suspend_manufacturer_account);//done
app.use("/api/decline_manufacturer_account",decline_manufacturer_account);
app.use("/api/subscribe_manufacturer_account",subscribe_manufacturer_account)//done
app.use("/api/un_subscribe_manufacturer_account",un_subscribe_manufacturer_account);//done
app.use("/api/delete_manufacturer_account",delete_manufacturer_account);//done
app.use("/api/verify_manufacturer_email",verify_manufacturer_email);//done
app.use("/api/un_verify_manufacturer_email",un_verify_manufacturer_email);//done

//salesperson
app.use("/api/approve_salesperson_account",approve_salesperson_account);//done
app.use("/api/get_salesperson_account",get_salesperson_account);//done
app.use("/api/get_salesperson_accounts",get_salesperson_accounts);//done
app.use("/api/suspend_salesperson_account",suspend_salesperson_account);//done
app.use("/api/un_suspend_salesperson_account",un_suspend_salesperson_account);//done
app.use("/api/decline_salesperson_account",decline_salesperson_account);//done
app.use("/api/delete_salesperson_account",delete_salesperson_account);//done
app.use("/api/verify_salesperson_email",verify_salesperson_email);//done
app.use("/api/un_verify_salesperson_email",un_verify_salesperson_email);//done

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
app.use("/api/approve_product",approve_product); //done
app.use("/api/decline_product",decline_product);//done
app.use("/api/get_products",get_products);//done
app.use("/api/get_product",get_product);//done
app.use("/api/delete_product",delete_product);//done
app.use("/api/edit_product",edit_product);//done
app.use("/api/feature_product",feature_product);//done
app.use("/api/un_feature_product",un_feature_product);//done

/*---expert_consultaion---*/
app.use("/api/create_expert_account",create_expert_account);
app.use("/api/get_expert_accounts",get_expert_accounts);
app.use("/api/get_expert_account",get_expert_account);
app.use("/api/delete_expert_account",delete_expert_account);
app.use("/api/edit_expert_account",edit_expert_account);

/*---vacancies---*/
app.use("/api/add_vacancy",add_vacancy);
app.use("/api/delete_vacancy",delete_vacancy);
app.use("/api/edit_vacancy",edit_vacancy);
app.use("/api/get_vacancies",get_vacancies);
app.use("/api/get_applications",get_applications);

/*---subcription_plan---*/
app.use("/api/add_new_plan",add_new_plan);
app.use("/api/delete_plan",delete_plan);
app.use("/api/edit_plan",edit_plan);
app.use("/api/get_subscription_plans",get_subscription_plans);

/*----support----*/
app.use("/api/get_career_mailing_list",get_career_mailing_list);
app.use("/api/get_mailing_list",get_langing_page_mailing_list);
//feedbacks
app.use("/api/get_feedbacks",get_feedbacks);//done
//support questions
app.use("/api/get_support_questions",get_support_questions);//done
app.use("/api/mark_support_as_solved",mark_support_as_solved);//done
app.use("/api/un_mark_support_as_solved",un_mark_support_as_solved);//done
app.use("/api/delete_support_question",delete_support_question);//done
//request demo tickets
app.use("/api/get_request_demo_tickets",get_request_demo_tickets);//done
app.use("/api/mark_request_demo_ticket_as_solved",mark_request_demo_ticket_as_solved);//done
app.use("/api/un_mark_request_demo_ticket_as_solved",un_mark_request_demo_ticket_as_solved);//done
app.use("/api/delete_ticket",delete_ticket);//done

/*-----orders-----*/
app.use("/api/get_orders",get_orders);//done
app.use("/api/get_order",get_order);//done
app.use("/api/edit_order",edit_order)//done
app.use("/api/reject_order",reject_order);//done
app.use("/api/approve_order",approve_order);//done
app.use("/api/delete_order",delete_order);//done

app.use("/api/get_requests",get_requests);
app.use("/api/complete_requests",complete_requests);
app.use("/api/delete_request",delete_request);

app.get('/',(req,res)=>{
	res.send("<html> <head>server Response</head><body><h1> This page was render directly from the server <p>Hello there welcome to Prokemia</p></h1></body></html>")
})

module.exports = app;
